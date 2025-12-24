import express from "express";
import uploadCkeditor from "../middleware/uploadCkeditor.js";
import { uploadCkeditorImage } from "../controllers/ckeditor.controller.js";

const router = express.Router();

router.post(
  "/upload",
  uploadCkeditor.single("upload"), // 👈 must match FormData key
  uploadCkeditorImage
);

export default router;
