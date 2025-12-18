import  Post from "../models/post.js";
import { postSchema }  from "../validators/post.schema.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ➕ Add Post (Admin)
export const addPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Zod validation
    const parsed = postSchema.safeParse({ title, description });
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

// 📥 Get All Posts (Public)
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

export const editPost = async (req, res) => {
  try {
    const {id} = req.params;
    const { title,description } = req.body;

    // Validate text fields (image optional)
    const parsed = postSchema.safeParse({ title, description });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // If new image uploaded → delete old image
    if (req.file) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        post.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      post.image = `/uploads/posts/${req.file.filename}`;
    }

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


export const deletePost = async (req, res) => {
  try {
    const {id} = req.params;

    const post = await Post.findById(id);
    if ( !post ) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Delet logic
    const imagePath = path.join(
      __dirname,
      "..",
      post.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
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

