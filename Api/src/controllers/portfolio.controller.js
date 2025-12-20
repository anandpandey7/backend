import ClientProject from "../models/client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   📥 GET 1: Clients WITHOUT portfolio
   (no gallery, for adding)
========================= */
export const getClientsWithoutPortfolio = async (req, res) => {
  try {
    const clients = await ClientProject.find({
      gallery: { $size: 0 }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   📥 GET 2: Clients WITH portfolio
   (for editing)
========================= */
export const getClientsWithPortfolio = async (req, res) => {
  try {
    const clients = await ClientProject.find({
      "gallery.0": { $exists: true }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   ➕ ADD Portfolio (gallery)
========================= */
export const addPortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    if (!req.files?.gallery?.length) {
      return res.status(400).json({
        success: false,
        message: "Gallery images are required"
      });
    }

    const newImages = req.files.gallery.map(
      f => `/uploads/clients/${f.filename}`
    );

    project.gallery = newImages;
    await project.save();

    res.json({
      success: true,
      message: "Portfolio added successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ✏️ EDIT Portfolio (replace/add)
========================= */
export const editPortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    // 📝 Update text fields (example)
    if (req.body.title) project.title = req.body.title;
    if (req.body.description) project.description = req.body.description;

    // 🖼️ If new gallery images are uploaded
    if (req.files?.gallery?.length) {

      // delete old images
      project.gallery.forEach(img => {
        const imgPath = path.join(__dirname, "..", img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });

      // save new images
      const newImages = req.files.gallery.map(
        f => `/uploads/clients/${f.filename}`
      );

      project.gallery = newImages;
    }

    await project.save();

    res.json({
      success: true,
      message: "Portfolio updated successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   🗑️ DELETE Portfolio
   (remove gallery only)
========================= */
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Client project not found"
      });
    }

    // delete images from disk
    project.gallery.forEach(img => {
      const imgPath = path.join(__dirname, "..", img);
      if (fs.existsSync(imgPath)) 
        fs.unlinkSync(imgPath);
    });

    project.gallery = [];
    await project.save();

    res.json({
      success: true,
      message: "Portfolio deleted successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
