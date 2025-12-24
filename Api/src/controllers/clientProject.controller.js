import ClientProject from "../models/client.js";
import { clientProjectSchema } from "../validators/clientProject.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import  extractImageUrls from "../utils/extractImageUrls.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Post 
export const addClientProject = async (req, res) => {
  try {
    const parsed = clientProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.files?.logo?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Logo image is required"
      });
    }
    // check for dublicate data


    const logoPath = `/uploads/clients/${req.files.logo[0].filename}`;
    const galleryPaths = req.files.gallery
      ? req.files.gallery.map(f => `/uploads/clients/${f.filename}`)
      : [];

    const newProject = await ClientProject.create({
      ...req.body,
      budget: req.body.budget ? Number(req.body.budget) : null,
      rating: req.body.rating ? Number(req.body.rating) : null,
      feedback: req.body.feedback ? req.body.feedback : null,
      logo: logoPath,
      gallery: galleryPaths
    });

    res.status(201).json({
      success: true,
      message: "Client project added successfully",
      project: newProject
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all clients
export const getClientProjects = async (req, res) => {
  try {
    const projects = await ClientProject.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ✏️ Edit Project
========================= */
export const editClientProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // validate merged data
    const parsed = clientProjectSchema.safeParse({
      ...project.toObject(),
      ...req.body
    });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    /* =========================
       🖼️ Handle logo replace
    ========================= */
    if (req.files?.logo?.[0]) {
      const oldLogo = path.join(__dirname, "..", project.logo);
      if (fs.existsSync(oldLogo)) fs.unlinkSync(oldLogo);
      project.logo = `/uploads/clients/${req.files.logo[0].filename}`;
    }

    /* =========================
       🖼️ Handle gallery append
    ========================= */
    if (req.files?.gallery?.length) {
      const newGallery = req.files.gallery.map(
        f => `/uploads/clients/${f.filename}`
      );
      project.gallery.push(...newGallery);
    }

    /* =========================
       📝 Handle longDescription images
    ========================= */
    if (req.body.longDescription) {
      const oldImages = extractImageUrls(project.longDescription);
      const newImages = extractImageUrls(req.body.longDescription);

      // images to delete = in old but not in new
      const removed = oldImages.filter(url => !newImages.includes(url));

      removed.forEach(imgUrl => {
        const imgPath = path.join(__dirname, "..", imgUrl);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });

      project.longDescription = req.body.longDescription;
    }

    /* =========================
       ✏️ Assign other fields
    ========================= */
    Object.assign(project, {
      ...req.body,
      budget: req.body.budget ? Number(req.body.budget) : project.budget,
      rating: req.body.rating ? Number(req.body.rating) : project.rating
    });

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete
export const deleteClientProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ClientProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    /* =========================
       🖼️ Delete logo
    ========================= */
    if (project.logo) {
      const logoPath = path.join(__dirname, "..", project.logo);
      if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
    }

    /* =========================
       🖼️ Delete gallery images
    ========================= */
    if (project.gallery?.length) {
      project.gallery.forEach(img => {
        const imgPath = path.join(__dirname, "..", img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    /* =========================
       📝 Delete CKEditor images
    ========================= */
    if (project.longDescription) {
      const descImages = extractImageUrls(project.longDescription);

      descImages.forEach(imgUrl => {
        const imgPath = path.join(__dirname, "..", imgUrl);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
