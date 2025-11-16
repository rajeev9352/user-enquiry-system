import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import "../index.css";

export default function EnquiryList({data, onDelete, onEdit}) {
    const handleDelete = (id) => {
        // Show confirmation dialog
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            onDelete(id);
        }
    };
    
    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Enquiry Details</h2>
          <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr No</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>
              Delete
            </TableHeadCell>
            <TableHeadCell>
              Edit
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            data.length>=1 ? data.map((item, index) => {
              return(
                <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1} 
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.email}
                </TableCell>
                <TableCell>
                  {item.phone}
                </TableCell>
                <TableCell>
                  {item.message}
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(item._id)} className=" button-del text-red-600 hover:underline">Delete</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => onEdit(item)} className=" button-edit text-blue-600 hover:underline">Edit</button>
                </TableCell>
              </TableRow>
              

              )
            })
            : <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" colSpan={7}>
              No Enquiries Found
            </TableCell>
          </TableRow>
          }
          
          
          
        </TableBody>
      </Table>
    </div>
        </div>
    )
}