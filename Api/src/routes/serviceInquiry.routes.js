import express from "express";
import {
  createServiceInquiryForm,
  getServiceInquiryForm,
  updateResponded,
  deleteServiceInquiryForm
} from "../controllers/serviceInquiry.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createServiceInquiryForm);

router.get("/",
    // authMiddleware,
    getServiceInquiryForm);

router.patch("/:id/responded",
    // authMiddleware,
    updateResponded);
router.delete("/:id",
    // authMiddleware,
    deleteServiceInquiryForm);

export default router;
