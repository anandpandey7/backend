// NOTE: This code is comment out and improved with the help of LLMs(like claud, ChatGPT) but I have full KNowledge of my code
// I have use LLMs to learn how professional programmers write code, although all initial codes are written by me and I have spend alot of time 
// in improving and adding new fields in many routes by my own ------------------------ please read this

import Job from "../models/job.js";
import { jobSchema, jobUpdateSchema } from "../validators/job.schema.js";

/* =========================
   ➕ Create Job
========================= */
export const createJob = async (req, res) => {
  try {
    // console.log("Request Body:", req.body); // Debugging line
    const parsed = jobSchema.safeParse(req.body);
    if (!parsed.success) {
          // console.log("Validation Errors:", parsed.error.issues);  // Debugging line
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const job = await Job.create(parsed.data);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📥 Get All Jobs
========================= */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📄 Get Single Job
========================= */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   ✏️ Update Job
========================= */
export const updateJob = async (req, res) => {
  try {
    const parsed = jobUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      parsed.data,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job updated successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   🗑️ Delete Job
========================= */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
