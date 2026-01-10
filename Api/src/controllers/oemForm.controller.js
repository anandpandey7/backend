import OEMForm from "../models/oemForm.js";
import { oemFormSchema, respondedSchema } from "../validators/oemForm.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFile = (file) => {
  if (file && fs.existsSync(file)) fs.unlinkSync(file);
};

// for CREATEING form from frontend 
export const createOEMForm = async (req, res) => {
  try {
    const parsed = oemFormSchema.safeParse(req.body);
    if (!parsed.success) {
      if (req.file) deleteFile(req.file.path);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const form = await OEMForm.create({
      ...parsed.data,
      projectReport: req.file
        ? `/uploads/oem/${req.file.filename}`
        : null
    });

    res.status(201).json({ success: true, form });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   📥 GET ALL FORMS (ADMIN)
====================== */
export const getAllOEMForms = async (req, res) => {
  try {
    const forms = await OEMForm.find()
      .populate("domain")
      .sort({ createdAt: -1 });

    res.json({ success: true, forms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   ✏️ UPDATE RESPONDED (ADMIN)
====================== */
export const updateResponded = async (req, res) => {
  try {
    const parsed = respondedSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const { responded, comment } = parsed.data;

    // for making code more robust
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form ID"
      });
    }

    const form = await OEMForm.findById(req.params.id);
    if(!form){
      return res.status(404).json({
        success: false,
        message: "form not found"
      });
    }

    form.responded = responded

    // update comment only if provided
    if (comment !== undefined) {
      form.comment = comment;
    }

    // clear comment when unresponded
    if (!responded) {
      form.comment = null;
    }

    await form.save();

    res.json({ success: true, form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// For DELETING form from db
export const deleteOEMForm = async (req, res) => {
  try {
    const form = await OEMForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Not found" });

    if (form.projectReport) {
      deleteFile(path.join(__dirname, "..", form.projectReport));
    }

    await form.deleteOne();
    res.json({ success: true, message: "Form deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
