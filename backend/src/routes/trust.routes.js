import express from "express";
import getTrustData from "../controllers/trust.controller.js";

const router = express.Router();

router.get("/", getTrustData);

export default router;
