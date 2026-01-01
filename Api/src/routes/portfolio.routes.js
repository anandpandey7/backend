import express from "express";
import {
  getClientsWithoutPortfolio,
  getClientsWithPortfolio,
  addPortfolio,
  editPortfolio,
  deletePortfolio
} from "../controllers/portfolio.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadClientProject from "../middleware/uploadClientProject.js";

const router = express.Router();

/* GET routes */
router.get("/clients", getClientsWithoutPortfolio);   // without gallery
router.get("/", getClientsWithPortfolio);             // with gallery

/* CRUD on portfolio (gallery) */
router.post(
  "/:id",
//   authMiddleware,
  uploadClientProject.fields([{ name: "gallery", maxCount: 10 }]),
  addPortfolio
);

router.put(
  "/:id",
//   authMiddleware,
  uploadClientProject.fields([{ name: "gallery", maxCount: 20 }]),
  editPortfolio
);

router.delete("/:id",
    //  authMiddleware,
      deletePortfolio);

export default router;
