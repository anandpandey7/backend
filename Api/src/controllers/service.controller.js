import Service from "../models/service.js";
import { serviceSchema } from "../validators/service.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Package from "../models/package.js";  // for getting package associated with that services

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to delete files

const deleteFile = (relativePath) => {
  try {
    if (!relativePath) return;

    const fullPath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("File delete failed:", err.message);
  }
};

const cleanupUploadedFiles = (files) => {
  if (!files) return;

  if (files.thumbnail?.[0]) {
    deleteFile(`/uploads/services/${files.thumbnail[0].filename}`);
  }

  if (files.gallery?.length) {
    files.gallery.forEach(file => {
      deleteFile(`/uploads/services/${file.filename}`);
    });
  }
};

// Create Service

export const addService = async (req, res) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.files?.thumbnail?.[0]) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required"
      });
    }

    const { title, description, longDescription } = parsed.data;

    const thumbnail = `/uploads/services/${req.files.thumbnail[0].filename}`;
    const gallery =
      req.files.gallery?.map(f => `/uploads/services/${f.filename}`) || [];

    const service = await Service.create({
      title,
      description,
      longDescription,
      thumbnail,
      gallery
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service
    });
  } catch (error) {
    cleanupUploadedFiles(req.files);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Services

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Service

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   ✏️ Update Service
========================= */
export const updateService = async (req, res) => {
  try {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      cleanupUploadedFiles(req.files);
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    // Replace thumbnail
    if (req.files?.thumbnail?.[0]) {
      deleteFile(service.thumbnail);
      service.thumbnail = `/uploads/services/${req.files.thumbnail[0].filename}`;
    }

    // Append gallery images
    if (req.files?.gallery?.length) {
      const newGallery = req.files.gallery.map(
        f => `/uploads/services/${f.filename}`
      );
      service.gallery.push(...newGallery);
    }

    Object.assign(service, parsed.data); // <-- new thing for me
    await service.save();

    res.json({
      success: true,
      message: "Service updated successfully",
      service
    });
  } catch (error) {
    cleanupUploadedFiles(req.files);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   🧹 Delete Single Gallery Image
========================= */
export const deleteServiceImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || !image.startsWith("/uploads/services/")) {
      return res.status(400).json({
        success: false,
        message: "Invalid image path"
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    if (!service.gallery.includes(image)) {
      return res.status(404).json({
        success: false,
        message: "Image not found in gallery"
      });
    }

    service.gallery = service.gallery.filter(img => img !== image);
    await service.save();

    deleteFile(image);

    res.json({
      success: true,
      message: "Gallery image deleted",
      service
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Service

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    deleteFile(service.thumbnail);
    service.gallery?.forEach(deleteFile);

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServicePackages = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const packages = await Package.find({ service: serviceId })
      .populate("servicesOffered.feature", "title type")
      .sort({ price: 1 });

    res.json({
      success: true,
      packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
