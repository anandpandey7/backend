import express from "express";
import {
  addState, getStates,editState, deleteState } from "../controllers/state.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get
router.get("/", getStates);

/* Admin */
router.post("/", 
    // authMiddleware, 
    addState);
router.put("/:id", 
    // authMiddleware, 
    editState);
router.delete("/:id", 
    // authMiddleware, 
    deleteState);

export default router;
