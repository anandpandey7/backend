import Setting from "../models/setting.js";
import { settingSchema, settingUpdateSchema } from "../validators/setting.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   ➕ Create Settings (only one)
========================= */
export const createSetting = async (req, res) => {
  try {
    const exists = await Setting.findOne();
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist. Use update instead."
      });
    }

    // 🧩 Parse social JSON if sent as string
    if (req.body.social && typeof req.body.social === "string") {
      try {
        req.body.social = JSON.parse(req.body.social);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid social JSON format"
        });
      }
    }

    // 🧩 Parse productCategory JSON if sent as string
    if (req.body.productCategory && typeof req.body.productCategory === "string") {
      try {
        req.body.productCategory = JSON.parse(req.body.productCategory);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid productCategory JSON format"
        });
      }
    }

    // 🧩 Parse colours JSON if sent as string
    if (req.body.colours && typeof req.body.colours === "string") {
      try {
        req.body.colours = JSON.parse(req.body.colours);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid colours JSON format"
        });
      }
    }

    const parsed = settingSchema.safeParse(req.body);
    if (!parsed.success) {
      if (req.file) {
        fs.unlinkSync(
          path.join(__dirname, "../uploads/settings", req.file.filename)
        );
      }
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required"
      });
    }

    const setting = await Setting.create({
      ...parsed.data,
      companyLogo: `/uploads/settings/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      message: "Settings created",
      setting
    });
  } catch (error) {
    if (req.file) {
      try {
        fs.unlinkSync(
          path.join(__dirname, "../uploads/settings", req.file.filename)
        );
      } catch {}
    }
    res.status(500).json({ success: false, message: error.message });
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
    // 🧩 Parse social JSON
    if (req.body.social && typeof req.body.social === "string") {
      try {
        req.body.social = JSON.parse(req.body.social);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid social JSON format"
        });
      }
    }

    // 🧩 Parse colours JSON
    if (req.body.colours && typeof req.body.colours === "string") {
      try {
        req.body.colours = JSON.parse(req.body.colours);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid colours JSON format"
        });
      }
    }

    // 🧩 Parse productCategory JSON if sent as string
    if (req.body.productCategory && typeof req.body.productCategory === "string") {
      try {
        req.body.productCategory = JSON.parse(req.body.productCategory);
      } catch {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "../uploads/settings", req.file.filename)
          );
        }
        return res.status(400).json({
          success: false,
          message: "Invalid productCategory JSON format"
        });
      }
    }

    const parsed = settingUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const setting = await Setting.findOne();
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Settings not found"
      });
    }

    // 🖼️ Replace logo if uploaded
    if (req.file) {
      const oldPath = path.join(__dirname, "..", setting.companyLogo);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      setting.companyLogo = `/uploads/settings/${req.file.filename}`;
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

    const logoPath = path.join(__dirname, "..", setting.companyLogo);
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);

    await setting.deleteOne();

    res.json({
      success: true,
      message: "Settings deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
