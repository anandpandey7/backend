import express from "express";
import { upsertTrustData } from "../controllers/trust.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.array("logos"),
  upsertTrustData
);

export default router;
