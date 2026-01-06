import OEMForm from "../model/oemForm.js";
import { oemFormSchema, respondedSchema } from "../validators/oemForm.schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleDelete = (file) =>{
    if(file && fs.existsSync(file)){
        fs.unlinkSync(file);
    }
}

//Create OEM form

export const createOEMForm = async (req,res) =>{
    try{
        const parsed = oemFormSchema.safeParse(req.body);

        if(!parsed.success){
            if(req.file){
                handleDelete(req.file.path);
            }
            return res.status(400).json({success: false, 
                errors: parsed.error.errors });
        }

        const form = new OEMForm({
            ...parsed.data,
            projectReport: req.file?`/uploads/oem/${req.file.filename}` : null,
        });
        await form.save();
        res.status(201).json({
            success: true,
            form
        })
    }
    catch(error){
        if(req.file){
            handleDelete(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET OEM form

export const getOEMForm = async (req, res) =>{
    try{
        const forms = await OEMForm.find().populate("domain").sort({createdAt: -1});
        
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

export const updateOEMForm = async (req, res) =>{
    try{
        const parsed = respondedSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                errors: parsed.error.errors
            })
        }

        const id = req.params.id;

        const form = await OEMForm.findByIdAndUpdate(
            id, parsed.data, {new: true}
        );

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "OEM form not found"
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

export const deleteOEMForm = async (req, res) =>{
    try{
        const form = await OEMForm.findById(req.params.id);

        if(!form){
            return res.status(404).json({
                success: false,
                message : "Form not found"
            })
        }

        if(form.projectReport && fs.existsSync(path.join(__dirname, "..", form.projectReport))){
            fs.unlinkSync(path.join(__dirname,"..",form.projectReport));
        }

        await form.deleteOne();
        res.status(200).json({
            success: true,
            message: " form deleted successfuly"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
