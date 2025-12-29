import Product from "../models/product.js";
import { productSchema, productUpdateSchema } from "../validators/product.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   ➕ Create Product
========================= */
export const createProduct = async (req, res) => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, "../uploads/products", req.file.filename));
      }
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required"
      });
    }

    const product = await Product.create({
      ...parsed.data,
      image: `/uploads/products/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
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
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, "../uploads/products", req.file.filename));
      }
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // 🖼️ Replace image if uploaded
    if (req.file) {
      const oldPath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      product.image = `/uploads/products/${req.file.filename}`;
    }

    Object.assign(product, parsed.data);
    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
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
