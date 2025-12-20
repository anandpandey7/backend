import express from "express";
import { addCity,getCities,editCity,deleteCity } from "../controllers/city.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();


// router.get("/", getCities);
router.get("/", getCities);


router.post("/", 
    // authMiddleware, 
    addCity);
router.put("/:id", 
    // authMiddleware, 
    editCity);
router.delete("/:id", 
    // authMiddleware, 
    deleteCity);

export default router;
