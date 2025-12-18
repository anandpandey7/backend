import express from "express";
import { addCountry, getCountries } from "../controllers/country.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import uploadCountryFlag from "../middleware/uploadCountryFlag.js";

const router = express.Router();

// Admin only
router.post(
  "/",
//   authMiddleware,
  uploadCountryFlag.single("flag"),
  addCountry
);

// Public
router.get("/", getCountries);

export default router;
