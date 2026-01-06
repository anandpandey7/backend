import express from "express";
import {
  createFeature, getFeatures, updateFeature, deleteFeature
} from "../controllers/feature.controller.js";

const router = express.Router();

router.post("/", createFeature);
router.get("/", getFeatures);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

export default router;
