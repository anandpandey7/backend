import express from "express";
import upload from "../middleware/uploadCertification.js";
import {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
  deleteCertificationImage
} from "../controllers/certification.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCertifications);

router.post(
  "/",
  upload.fields([
    { name: "logos", maxCount: 15 },
    { name: "certificates", maxCount: 10 }
  ]),
//   authMiddleware,
  createCertification
);

router.put(
  "/",
  upload.fields([
    { name: "logos", maxCount: 10 },
    { name: "certificates", maxCount: 10 }
  ]),
//   authMiddleware,
  updateCertification
);

router.delete("/",
    // authMiddleware,
     deleteCertification);

/* delete single image */
router.delete("/image",
    // authMiddleware,
     deleteCertificationImage);

export default router;
