import express from "express";
import { createProduct,getProducts,getProductById,updateProduct,deleteProduct} from "../controllers/product.controller.js";

import uploadProduct from "../middleware/uploadProduct.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", 
    // authMiddleware, 
    uploadProduct.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",
    //  authMiddleware,
      uploadProduct.single("image"), updateProduct);
router.delete("/:id",
    //  authMiddleware,
      deleteProduct);

export default router;
