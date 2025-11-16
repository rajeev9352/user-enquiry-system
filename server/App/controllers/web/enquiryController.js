const Enquiry = require('../../models/enquiry.model');

let enquiryInsert=(req,res)=>{
    let {name,email,phone,message}=req.body;
    let enquiry=new Enquiry({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then((data)=>{
        res.send({status:1, message:"Enquiry submitted successfully",data:data});
    }).catch((err)=>{
        res.send({status:0, message:"Error submitting enquiry",error:err});
    });

}

let enquiryList=async(req,res)=>{
    let enquiryList = await Enquiry.find();
    res.send({status:1, data:enquiryList});
}

let enquiryDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        
        if (!deletedEnquiry) {
            return res.send({ status: 0, message: "Enquiry not found" });
        }
        
        res.send({ status: 1, message: "Enquiry deleted successfully", data: deletedEnquiry });
    } catch (err) {
        res.send({ status: 0, message: "Error deleting enquiry", error: err });
    }
}

let enquiryUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, message } = req.body;
        
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id,
            { name, email, phone, message },
            { new: true } // Return the updated document
        );
        
        if (!updatedEnquiry) {
            return res.send({ status: 0, message: "Enquiry not found" });
        }
        
        res.send({ status: 1, message: "Enquiry updated successfully", data: updatedEnquiry });
    } catch (err) {
        res.send({ status: 0, message: "Error updating enquiry", error: err });
    }
}

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate };