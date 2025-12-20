import Service from "../models/service.js";
import { serviceSchema } from "../validators/service.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ➕ Create Service */
export const addService = async (req, res) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required"
      });
    }

    const { title, description, longDescription } = parsed.data;

    const service = await Service.create({
      title,
      description,
      longDescription,
      thumbnail: `/uploads/services/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 📥 Get All Services */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 📥 Get Single Service */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✏️ Update Service */
export const updateService = async (req, res) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // If new thumbnail uploaded, delete old
    if (req.file) {
      const oldPath = path.join(__dirname, "..", service.thumbnail);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      service.thumbnail = `/uploads/services/${req.file.filename}`;
    }

    const { title, description, longDescription } = parsed.data;
    service.title = title;
    service.description = description;
    service.longDescription = longDescription;

    await service.save();

    res.json({
      success: true,
      message: "Service updated successfully",
      service
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* 🗑️ Delete Service */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const imgPath = path.join(__dirname, "..", service.thumbnail);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
