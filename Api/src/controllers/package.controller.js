import Package from "../models/package.js";
import {packageSchema,packageUpdateSchema } from "../validators/package.schema.js";
import { validatePackageFeatures } from "../utils/validatePackageFeatures.js";

/* =========================
   ➕ CREATE PACKAGE
========================= */
export const createPackage = async (req, res) => {
  try {
    // console.log(req.body);
    const parsed = packageSchema.safeParse(req.body);
    if (!parsed.success) {
      // console.log("parsed error");
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    // 🔒 HARD CHECK
    if (parsed.data.servicesOffered?.length) {
      await validatePackageFeatures(parsed.data.servicesOffered);
    }

    const pkg = await Package.create(parsed.data);

    res.status(201).json({
      success: true,
      message: "Package created",
      package: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   📥 GET ALL PACKAGES
========================= */
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate("servicesOffered.feature")
      .sort({ createdAt: -1 });

    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   📥 GET SINGLE PACKAGE
========================= */
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)
      .populate("servicesOffered.feature");

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({ success: true, package: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   ✏️ UPDATE PACKAGE
========================= */
export const updatePackage = async (req, res) => {
  try {
    const parsed = packageUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (parsed.data.servicesOffered?.length) {
      await validatePackageFeatures(parsed.data.servicesOffered);
    }

    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      parsed.data,
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      message: "Package updated",
      package: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   🗑️ DELETE PACKAGE
========================= */
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      message: "Package deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
