import express from "express";
import { createSetting,getSetting,updateSetting,deleteSetting} from "../controllers/setting.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadSetting from "../middleware/uploadSetting.js";

const router = express.Router();

router.get("/", getSetting);

router.post(
  "/",
//   authMiddleware,
  uploadSetting.single("companyLogo"),
  createSetting
);

router.put(
  "/",
//   authMiddleware,
  uploadSetting.single("companyLogo"),
  updateSetting
);

router.delete("/", 
    // authMiddleware, 
    deleteSetting);

export default router;
