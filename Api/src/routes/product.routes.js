import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import { productUpload } from "../middleware/uploadProduct.js";
// import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  // authMiddleware,
  productUpload,
  createProduct
);

router.put(
  "/:id",
  // authMiddleware,
  productUpload,
  updateProduct
);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
