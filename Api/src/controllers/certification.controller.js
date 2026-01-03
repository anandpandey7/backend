import Certification from "../models/certification.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// for deleting images from backend
const deleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error(`Failed to delete file: ${filePath}`, err.message);
  }
};

// cleanup uploaded files on error "req.files object"
const cleanupUploadedFiles = (files) => {
  if (!files) return;

  try {
    // Clean up logos
    if (files.logos?.length) {
      files.logos.forEach(file => {
        const filePath = path.join(__dirname, "..", "uploads", "certifications", file.filename);
        deleteFile(filePath);
      });
    }

    // Clean up certificates
    if (files.certificates?.length) {
      files.certificates.forEach(file => {
        const filePath = path.join(__dirname, "..", "uploads", "certifications", file.filename);
        deleteFile(filePath);
      });
    }
  } catch (err) {
    console.error("Error during file cleanup:", err.message);
  }
};

/**
 * Cleanup files by their stored paths
 * @param {Array} filePaths - Array of file paths to delete
 */
const cleanupStoredFiles = (filePaths) => {
  if (!filePaths || !Array.isArray(filePaths)) return;

  try {
    filePaths.forEach(filePath => {
      const fullPath = path.join(__dirname, "..", filePath);
      deleteFile(fullPath);
    });
  } catch (err) {
    console.error("Error during stored files cleanup:", err.message);
  }
};

// CREATE ROUTE
export const createCertification = async (req, res) => {
  try {

    // ❌ Prevent duplicate settings
    const exists = await Certification.findOne();
    if (exists) {
        cleanupUploadedFiles(req.files);
        return res.status(400).json({
        success: false,
        message: "Settings already exist. Use update instead."
        });
    }


    const { description } = req.body;

    if (!description) {
      // Cleanup uploaded files before returning error
      cleanupUploadedFiles(req.files);
      
      return res.status(400).json({
        success: false,
        message: "Description is required"
      });
    }

    const logos = req.files?.logos?.map(
      f => `/uploads/certifications/${f.filename}`
    ) || [];

    const certificates = req.files?.certificates?.map(
      f => `/uploads/certifications/${f.filename}`
    ) || [];

    const certification = await Certification.create({
      description,
      logos,
      certificates
    });

    res.status(201).json({
      success: true,
      message: "Certification created",
      certification
    });

  } catch (error) {
    // Cleanup uploaded files on error
    cleanupUploadedFiles(req.files);
    
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* =========================
   📥 Get All Certifications
========================= */
export const getCertifications = async (req, res) => {
  try {
    const data = await Certification.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* =========================
   ✏️ Update Certification
========================= */
export const updateCertification = async (req, res) => {
  try {

    const cert = await Certification.findOne();
    if (!cert) {
      // Cleanup uploaded files before returning error
      cleanupUploadedFiles(req.files);
      
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    if (req.body.description) {
      cert.description = req.body.description;
    }

    // const newLogos = [];
    // const newCertificates = [];

    if (req.files?.logos?.length) {
      const logos = req.files.logos.map(
        f => `/uploads/certifications/${f.filename}`
      );
    //   newLogos.push(...logos);
      cert.logos.push(...logos);
    }

    if (req.files?.certificates?.length) {
      const certificates = req.files.certificates.map(
        f => `/uploads/certifications/${f.filename}`
      );
    //   newCertificates.push(...certificates);
      cert.certificates.push(...certificates);
    }

    await cert.save();

    res.json({
      success: true,
      message: "Certification updated",
      certification: cert
    });

  } catch (error) {
    // Cleanup only newly uploaded files on error
    cleanupUploadedFiles(req.files);
    
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* =========================
   🗑️ Delete Certification
========================= */
export const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findOne();
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    // Cleanup all associated files
    cleanupStoredFiles(cert.logos);
    cleanupStoredFiles(cert.certificates);

    await cert.deleteOne();

    res.json({
      success: true,
      message: "Certification deleted"
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* =========================
   🧹 Delete Single Image
========================= */
export const deleteCertificationImage = async (req, res) => {
  try {
    const { type, image } = req.body;

    if (!type || !image) {
      return res.status(400).json({
        success: false,
        message: "Type and image path are required"
      });
    }

    if (!["logos", "certificates"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image type"
      });
    }

    if (!image.startsWith("/uploads/certifications/")) {
      return res.status(400).json({
        success: false,
        message: "Invalid image path"
      });
    }

    const cert = await Certification.findOne();
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    if (!cert[type].includes(image)) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    // Remove from DB
    cert[type] = cert[type].filter(img => img !== image);
    await cert.save();

    // Remove from disk
    const filePath = path.join(
      __dirname,
      "..",
      image.replace(/^\/+/, "")
    );
    deleteFile(filePath);

    res.json({
      success: true,
      message: "Image deleted successfully",
      certification: cert
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
