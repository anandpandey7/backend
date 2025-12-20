import express from "express";
import {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/service.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadService from "../middleware/uploadService.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);

router.post(
  "/",
//   authMiddleware,
  uploadService.single("thumbnail"),
  addService
);

router.put(
  "/:id",
//   authMiddleware,
  uploadService.single("thumbnail"),
  updateService
);

router.delete("/:id", 
    // authMiddleware, 
    deleteService);

export default router;
