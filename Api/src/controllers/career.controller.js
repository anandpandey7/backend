import Career from "../models/careerApplication.js";
import { careerSchema, careerUpdateSchema } from "../validators/career.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   ➕ Apply for Job
========================= */
export const createCareer = async (req, res) => {
  try {
    const parsed = careerSchema.safeParse(req.body);
    if (!parsed.success) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CV is required"
      });
    }

    const career = await Career.create({
      ...parsed.data,
      cv: `/uploads/cv/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      career
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📥 Get All Applications (Admin)
========================= */
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📄 Get Single Application
========================= */
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   ✏️ Update (Responded Status)
========================= */
export const updateCareer = async (req, res) => {
  try {
    const parsed = careerUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues
      });
    }

    const career = await Career.findByIdAndUpdate(
      req.params.id,
      parsed.data,
      { new: true }
    );

    if (!career) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      message: "Application updated",
      career
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   🗑️ Delete Application
========================= */
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const cvPath = path.join(__dirname, "..", career.cv);
    if (fs.existsSync(cvPath)) fs.unlinkSync(cvPath);

    await career.deleteOne();

    res.json({
      success: true,
      message: "Application deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
