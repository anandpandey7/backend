import express from "express";
import uploadOEM from "../middleware/uploadOEMReport.js";
import {
  createOEMForm,
  getAllOEMForms,
  updateResponded,
  deleteOEMForm
} from "../controllers/oemForm.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", uploadOEM.single("projectReport"), createOEMForm);

router.get("/",
    authMiddleware,
    getAllOEMForms);

router.patch("/:id/responded",
    authMiddleware,
    updateResponded);
router.delete("/:id",
    authMiddleware,
     deleteOEMForm);

export default router;
