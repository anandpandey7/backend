import express from "express";
import {
  getClientsWithoutTestimonials,
  getClientsWithTestimonials,
  addTestimonial,
  editTestimonial,
  deleteTestimonial
} from "../controllers/testimonial.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/* GET */
router.get("/clients", getClientsWithoutTestimonials); // without rating/feedback
router.get("/", getClientsWithTestimonials);           // with rating/feedback

/* CRUD */
router.post("/:id", 
    // authMiddleware, 
    addTestimonial);
router.put("/:id", 
    // authMiddleware, 
    editTestimonial);
router.delete("/:id", 
    // authMiddleware, 
    deleteTestimonial);

export default router;
