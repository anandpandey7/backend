// NOTE: This code is comment out and improved with the help of LLMs(like claud, ChatGPT) but I have full KNowledge of my code
// I have use LLMs to learn how professional programmers write code, although all initial codes are written by me and I have spend alot of time 
// in improving and adding new fields in many routes by my own ------------------------ please read this

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

    const { responded, comment } = parsed.data;

    const applicant = await Career.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    applicant.responded = responded;

    // update comment only if provided
    if (comment !== undefined) {
      applicant.comment = comment;
    }

    // clear comment when unresponded
    if (!responded) {
      applicant.comment = null;
    }

    await applicant.save();

    res.json({
      success: true,
      message: "Application updated",
      applicant
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
