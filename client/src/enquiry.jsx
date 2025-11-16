import React, {useEffect, useState} from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import "./index.css";
import EnquiryList from "./enquiry/EnquiryList";
import axios from "axios";

// Use environment variable for API URL or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let [editMode, setEditMode] = useState(false);
  let [currentEditId, setCurrentEditId] = useState(null);

  let saveEnquiry = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing enquiry
      axios
        .put(`${API_BASE_URL}/api/website/enquiries/update/${currentEditId}`, formdata)
        .then((res) => {
          console.log(res);
          toast.success("Enquiry updated successfully");

          setFormdata({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setEditMode(false);
          setCurrentEditId(null);
          
          // Refresh the list
          getAllEnquiries();
        })
        .catch((err) => {
          console.log("Error updating enquiry:", err);
          if (err.response) {
            // Server responded with error status
            toast.error(`Update failed: ${err.response.data.message || err.response.statusText}`);
          } else if (err.request) {
            // Request was made but no response received
            toast.error("Update failed: No response from server. Check if backend is running.");
          } else {
            // Something else happened
            toast.error(`Update failed: ${err.message}`);
          }
        });
    } else {
      // Create new enquiry
      axios
        .post(`${API_BASE_URL}/api/website/enquiries/insert`,formdata )
        .then((res) => {
          console.log(res);
          toast.success("Enquiry saved successfully");

          setFormdata({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          
          // Refresh the list after saving
          getAllEnquiries();
        })
        .catch((err) => {
          console.log("Error saving enquiry:", err);
          if (err.response) {
            // Server responded with error status
            toast.error(`Save failed: ${err.response.data.message || err.response.statusText}`);
          } else if (err.request) {
            // Request was made but no response received
            toast.error("Save failed: No response from server. Check if backend is running and URL is correct.");
          } else {
            // Something else happened
            toast.error(`Save failed: ${err.message}`);
          }
        });
    }
  };

  let getAllEnquiries = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/website/enquiries/list`);
    console.log("Fetched Enquiries:", res.data);

    if (res.data.status === 1) {
      setEnquiryList(res.data.data); // ✅ correct key name
    }
  } catch (err) {
    console.log("Error fetching enquiries:", err);
    if (err.response) {
      toast.error(`Failed to fetch enquiries: ${err.response.data.message || err.response.statusText}`);
    } else if (err.request) {
      toast.error("Failed to fetch enquiries: No response from server. Check if backend is running.");
    } else {
      toast.error(`Failed to fetch enquiries: ${err.message}`);
    }
  }
};

  let deleteEnquiry = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/website/enquiries/delete/${id}`);
      
      if (res.data.status === 1) {
        toast.success("Enquiry deleted successfully");
        // Refresh the list
        getAllEnquiries();
      } else {
        toast.error(res.data.message || "Error deleting enquiry");
      }
    } catch (err) {
      console.log("Error deleting enquiry:", err);
      if (err.response) {
        toast.error(`Delete failed: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        toast.error("Delete failed: No response from server. Check if backend is running.");
      } else {
        toast.error(`Delete failed: ${err.message}`);
      }
    }
  };

  let editEnquiry = (enquiry) => {
    // Set form data to the selected enquiry
    setFormdata({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
    });
    
    // Set edit mode and current edit id
    setEditMode(true);
    setCurrentEditId(enquiry._id);
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formdata };

    oldData[inputName] = inputValue;

    setFormdata(oldData);
  };
  
  let cancelEdit = () => {
    // Reset form and exit edit mode
    setFormdata({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setEditMode(false);
    setCurrentEditId(null);
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);

  return (
    <div>
    <ToastContainer />
      <h1 className="text-4xl text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 h-screen p-4">
          <h2 className="">{editMode ? "Edit Enquiry" : "Enquiry Form"}</h2>
          <form
            action=""
            onSubmit={saveEnquiry}
            className="flex max-w-md flex-col gap-4"
          >
            <div className="mb-2 block">
              <Label htmlFor="name">Name</Label>
              <TextInput
                type="text"
                value={formdata.name}
                onChange={getValue}
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                value={formdata.email}
                onChange={getValue}
                name="email"
                placeholder="Enter your mail"
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="phone">Phone</Label>
              <TextInput
                type="text"
                value={formdata.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter your no"
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formdata.message}
                onChange={getValue}
                name="message"
                placeholder="Message"
                required
                rows={4}
              />
            </div>
            <div className="mb-2 block space-x-2">
              <Button type="submit">{editMode ? "Update" : "Save"}</Button>
              {editMode && (
                <Button type="button" color="gray" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
        <EnquiryList 
          data={enquiryList} 
          onDelete={deleteEnquiry}
          onEdit={editEnquiry}
        />
      </div>
    </div>
  );
}