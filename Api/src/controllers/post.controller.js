import Post from "../models/post.js";
import { postSchema } from "../validators/post.schema.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import extractImageUrls from "../utils/extractImageUrls.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add Post
export const addPost = async (req, res) => {
  try {
    const { title, description, projectLongDescription } = req.body;

    // Zod validation
    const parsed = postSchema.safeParse({ title, description, projectLongDescription });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Post image is required"
      });
    }

    const post = new Post({
      title,
      description,
      projectLongDescription,
      image: `/uploads/posts/${req.file.filename}`
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Edit Post
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, projectLongDescription } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Validate merged data
    const parsed = postSchema.safeParse({
      title: title || post.title,
      description: description || post.description,
      projectLongDescription: projectLongDescription || post.projectLongDescription
    });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    /* =========================
       🖼️ Handle main image replace
    ========================= */
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", post.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      post.image = `/uploads/posts/${req.file.filename}`;
    }

    /* =========================
       📝 Handle projectLongDescription images (CKEditor)
    ========================= */
    if (projectLongDescription && projectLongDescription !== post.projectLongDescription) {
      const oldImages = extractImageUrls(post.projectLongDescription || "");
      const newImages = extractImageUrls(projectLongDescription);

      // Images to delete = in old but not in new
      const removed = oldImages.filter(url => !newImages.includes(url));

      removed.forEach(imgUrl => {
        const imgPath = path.join(__dirname, "..", imgUrl);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });

      post.projectLongDescription = projectLongDescription;
    }

    /* =========================
       ✏️ Update other fields
    ========================= */
    post.title = title;
    post.description = description;

    await post.save();

    res.json({
      success: true,
      message: "Post updated successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    /* =========================
       🖼️ Delete main post image
    ========================= */
    if (post.image) {
      const imagePath = path.join(__dirname, "..", post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    /* =========================
       📝 Delete CKEditor images from projectLongDescription
    ========================= */
    if (post.projectLongDescription) {
      const descImages = extractImageUrls(post.projectLongDescription);

      descImages.forEach(imgUrl => {
        const imgPath = path.join(__dirname, "..", imgUrl);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};