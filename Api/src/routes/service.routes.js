import express from "express";
import {
  addService,getServices,getServiceById,updateService,deleteService,deleteServiceImage, getServicePackages
} from "../controllers/service.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadService, { serviceUploadFields } from "../middleware/uploadService.js";

import Package from "../models/package.js";

const router = express.Router();

/* =========================
   📥 Service Routes
========================= */

router.get("/", getServices);
router.get("/:id", getServiceById);

// Create Services
router.post(
  "/",
  // authMiddleware,
  serviceUploadFields,
  addService
);

// Update Service
router.put(
  "/:id",
  // authMiddleware,
  serviceUploadFields,
  updateService
);

/* 🧹 Delete single gallery image */
router.delete(
  "/:id/image",
  // authMiddleware,
  deleteServiceImage
);

/* 🗑️ Delete Service */
router.delete(
  "/:id",
  // authMiddleware,
  deleteService
);

/* =========================
   📦 GET Packages of Service
   GET /api/services/:serviceId/packages
========================= */
router.get("/:serviceId/packages", getServicePackages );

export default router;
