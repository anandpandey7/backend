import express from "express";
import {
  createProductInquiryForm,
  getProductInquiryForm,
  updateResponded,
  deleteProductInquiryForm
} from "../controllers/productInquiry.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createProductInquiryForm);

router.get("/",
    // authMiddleware,
    getProductInquiryForm);

router.patch("/:id/responded",
    // authMiddleware,
    updateResponded);
router.delete("/:id",
    // authMiddleware,
    deleteProductInquiryForm);

export default router;
