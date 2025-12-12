import express from "express";
import { signup, signin, changePassword } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/change-password", authMiddleware, changePassword);

export default router;
