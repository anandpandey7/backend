import express from "express";
import {
  createSetting,
  getSetting,
  updateSetting,
  deleteSetting
} from "../controllers/setting.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadSetting from "../middleware/uploadSetting.js";

const router = express.Router();

// 🔹 Get settings
router.get("/", getSetting);

// 🔹 Create settings
router.post(
  "/",
  // authMiddleware,
  uploadSetting.fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "video1", maxCount: 1 },
    { name: "video2", maxCount: 1 }
  ]),
  createSetting
);

// 🔹 Update settings
router.put(
  "/",
  // authMiddleware,
  uploadSetting.fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "video1", maxCount: 1 },
    { name: "video2", maxCount: 1 }
  ]),
  updateSetting
);

// 🔹 Delete settings
router.delete(
  "/",
  // authMiddleware,
  deleteSetting
);

export default router;
