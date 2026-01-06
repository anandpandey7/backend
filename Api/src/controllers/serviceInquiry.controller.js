import ServiceForm from "../models/serviceInquiry.js";
import { servicesInquiryFormSchema, respondedSchema } from "../validators/serviceInquiry.schema.js";

//Create OEM form

export const createServiceInquiryForm = async (req,res) =>{
    try{
        const parsed = servicesInquiryFormSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({success: false, 
                errors: parsed.error.errors });
        }

        const form = new ServiceForm({
            ...parsed.data,
        });

        await form.save();

        res.status(201).json({
            success: true,
            form
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET OEM form

export const getServiceInquiryForm = async (req, res) =>{
    try{
        const forms = await ServiceForm.find().populate("service").sort({createdAt: -1});
        
        res.status(200).json({
            success: true, forms
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Update Oem form : responded

export const updateResponded = async (req, res) =>{
    try{
        const parsed = respondedSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                errors: parsed.error.errors
            })
        }

        const id = req.params.id;

        const form = await ServiceForm.findByIdAndUpdate(
            id, parsed.data, {new: true}
        );

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Services Inquiry form not found"
            });
        }

        res.status(200).json({
            success: true,
            form
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Delete OEM form

export const deleteServiceInquiryForm = async (req, res) =>{
    try{
        const form = await ServiceForm.findById(req.params.id);

        if(!form){
            return res.status(404).json({
                success: false,
                message : "Form not found"
            })
        }

        await form.deleteOne();
        res.status(204).json({
            success: true,
            message: " form deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
