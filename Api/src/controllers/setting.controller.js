import Setting from "../models/setting.js";
import { settingSchema, settingUpdateSchema } from "../validators/setting.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// clean up code when error happens 
const cleanupFiles = (req) => {
    if (!req?.files) return;

    Object.values(req.files)
      .flat()
      .forEach((file) => {
        try {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", file.filename)
          );
        } catch {}
      });
  };

// create settings
export const createSetting = async (req, res) => {
  try {
    // ❌ Prevent duplicate settings
    const exists = await Setting.findOne();
    if (exists) {
      cleanupFiles(req);
      return res.status(400).json({
        success: false,
        message: "Settings already exist. Use update instead."
      });
    }

    // 🧩 Parse JSON fields safely
    const jsonFields = ["social", "productCategory", "colours"];

    for (const field of jsonFields) {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch {
          cleanupFiles(req);
          return res.status(400).json({
            success: false,
            message: `Invalid ${field} JSON format`
          });
        }
      }
    }

    // 🛡️ Zod validation
    const parsed = settingSchema.safeParse(req.body);
    if (!parsed.success) {
      cleanupFiles(req);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    // 🖼️ Company logo is REQUIRED
    if (!req.files?.companyLogo) {
      cleanupFiles(req);
      return res.status(400).json({
        success: false,
        message: "Company logo is required"
      });
    }

    // 📂 Extract files
    const logo = req.files.companyLogo[0];
    const video1 = req.files.video1?.[0] || null;
    const video2 = req.files.video2?.[0] || null;

    // 💾 Create setting
    const setting = await Setting.create({
      ...parsed.data,
      companyLogo: `/uploads/settings/${logo.filename}`,
      video1: video1 ? `/uploads/settings/${video1.filename}` : null,
      video2: video2 ? `/uploads/settings/${video2.filename}` : null
    });

    return res.status(201).json({
      success: true,
      message: "Settings created successfully",
      setting
    });
  } catch (error) {
    cleanupFiles(req);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   📥 Get Settings
========================= */
export const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   ✏️ Update Settings (partial)
========================= */
export const updateSetting = async (req, res) => {
  try {
    const jsonFields = ["social", "productCategory", "colours"];
    for (const field of jsonFields) {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch {
          cleanupFiles(req);
          return res.status(400).json({
            success: false,
            message: `Invalid ${field} JSON format`
          });
        }
      }
    }

    const parsed = settingUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      cleanupFiles(req);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const setting = await Setting.findOne();
    if (!setting) {
      cleanupFiles(req);
      return res.status(404).json({
        success: false,
        message: "Settings not found"
      });
    }

    if(req.files?.companyLogo){
      fs.unlinkSync(path.join(__dirname,"..",setting.companyLogo));
      setting.companyLogo = `/uploads/settings/${req.files.companyLogo[0].filename}`;
    }

    if(req.files?.video1){
      fs.unlinkSync(path.join(__dirname,"..",setting.video1));
      setting.video1 = `/uploads/settings/${req.files.video1[0].filename}`;
    }

    if(req.files?.video2){
      fs.unlinkSync(path.join(__dirname,"..",setting.video2));
      setting.video2 = `/uploads/settings/${req.files.video2[0].filename}`;
    }

    Object.assign(setting, parsed.data);
    await setting.save();

    res.json({
      success: true,
      message: "Settings updated",
      setting
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   🗑️ Delete Settings
========================= */
export const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Settings not found"
      });
    }

    if(setting.companyLogo){
      fs.unlinkSync(path.join(__dirname,"..",setting.companyLogo));
    }

    if(setting.video1){
      fs.unlinkSync(path.join(__dirname,"..",setting.video1));
    }

    if(setting.video2){
      fs.unlinkSync(path.join(__dirname,"..",setting.video2));
    }
    
    await setting.deleteOne();

    res.json({
      success: true,
      message: "Settings deleted"
    });
  } catch (error) {
    cleanupFiles(req);
    res.status(500).json({ success: false, message: error.message });
  }
};
