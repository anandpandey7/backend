import express from "express";
import {
  createDomain,
  getDomains,
  updateDomain,
  deleteDomain
} from "../controllers/domain.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/",
    authMiddleware,
    createDomain);

router.get("/", getDomains);

router.put("/:id",
    authMiddleware,
    updateDomain);

router.delete("/:id",
    authMiddleware,
    deleteDomain);

export default router;
