import Product from "../models/product.js";
import { productSchema, productUpdateSchema } from "../validators/product.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for deleting images

export const deleteFile = (relativePath) => {
  try {
    if (!relativePath) return;

    const fullPath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("File delete failed:", err.message);
  }
};

export const cleanupUploadedFiles = (files) => {
  if (!files) return;

  if (files.image?.[0]) {
    deleteFile(`/uploads/products/${files.image[0].filename}`);
  }

  if (files.gallery?.length) {
    files.gallery.forEach(file => {
      deleteFile(`/uploads/products/${file.filename}`);
    });
  }
};

/* =========================
   ➕ Create Product
========================= */
export const createProduct = async (req, res) => {
  try {
    const parsed = productSchema.safeParse(req.body);

    if (!parsed.success) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.files?.image?.[0]) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Product image is required"
      });
    }

    const gallery =
      req.files.gallery?.map(
        f => `/uploads/products/${f.filename}`
      ) || [];

    const product = await Product.create({
      ...parsed.data,
      image: `/uploads/products/${req.files.image[0].filename}`,
      gallery
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    cleanupUploadedFiles(req.files);
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📥 Get All Products
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   📄 Get Single Product
========================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =========================
   ✏️ Update Product
========================= */
export const updateProduct = async (req, res) => {
  try {
    const parsed = productUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // 🖼️ Replace main image
    if (req.files?.image?.[0]) {
      deleteFile(product.image);
      product.image = `/uploads/products/${req.files.image[0].filename}`;
    }


    if (req.files?.gallery?.length) {
      if (product.gallery?.length) {
        product.gallery.forEach(img => deleteFile(img));
      }
      product.gallery = req.files.gallery.map(
        file => `/uploads/products/${file.filename}`
      );
    }

    Object.assign(product, parsed.data);
    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    cleanupUploadedFiles(req.files);
    res.status(500).json({ success: false, message: error.message });
  }
};



/* =========================
   🗑️ Delete Product
========================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const imgPath = path.join(__dirname, "..", product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
