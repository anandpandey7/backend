import express from "express";
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage
} from "../controllers/package.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/",
    // authMiddleware,
     createPackage);
router.get("/", getPackages);
router.get("/:id", getPackageById);
router.put("/:id",
    // authMiddleware,
     updatePackage);
router.delete("/:id",
    // authMiddleware,
     deletePackage);

export default router;
