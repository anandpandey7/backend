import express from "express";
import {addInquiry,getInquiries,getInquiryById,updateInquiryResolve,deleteInquiry } from "../controllers/inquiry.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/* Public */
router.post("/", addInquiry);

/* Admin */
router.get("/", 
    // authMiddleware, 
    getInquiries);
router.get("/:id", 
    // authMiddleware, 
    getInquiryById);
router.put("/:id", 
    // authMiddleware, 
    updateInquiryResolve);
router.delete("/:id", 
    // authMiddleware, 
    deleteInquiry);

export default router;
