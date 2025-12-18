import express from "express";
import { addPost, getPosts, editPost, deletePost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import uploadPostImage from "../middleware/uploadPostImage.js";

const router = express.Router();

// Admin only
router.post(
  "/",
  // authMiddleware,
  uploadPostImage.single("image"),
  addPost
);

// Public
router.get("/", getPosts);

router.put(
  "/:id",
  // adminMiddleware,
  uploadPostImage.single("image"),
  editPost
);

router.delete(
  "/:id",
  // adminMiddleware,
  deletePost
);

export default router;
