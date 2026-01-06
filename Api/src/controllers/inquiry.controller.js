import Inquiry from "../models/inquiry.js";
import { inquirySchema, inquiryRespondSchema } from "../validators/inquiry.schema.js";

/* ➕ Create Inquiry */
export const addInquiry = async (req, res) => {
  try {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const inquiry = await Inquiry.create(parsed.data);

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 📥 Get All Inquiries */
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 📥 Get Single Inquiry */
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✏️ Update Inquiry → only resolve field */
export const updateInquiryResolve = async (req, res) => {
  try {
    const { resolve } = req.body;

    if (typeof resolve !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Resolve must be boolean"
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    inquiry.resolve = resolve;
    await inquiry.save();

    res.json({
      success: true,
      message: "Inquiry resolve status updated",
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 🗑️ Delete Inquiry */
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    await inquiry.deleteOne();

    res.json({
      success: true,
      message: "Inquiry deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
