import express from "express";
import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer
} from "../controllers/career.controller.js";
import { uploadCV } from "../middleware/UploadCV.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", uploadCV.single("cv"), createCareer);
router.get("/", 
    // authMiddleware, 
    getCareers);
router.get("/:id", 
    // authMiddleware, 
    getCareerById);
router.patch("/:id", 
    // authMiddleware, 
    updateCareer);
router.delete("/:id", 
    // authMiddleware, 
    deleteCareer);

export default router;
