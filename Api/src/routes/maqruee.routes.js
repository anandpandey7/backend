import express from "express";
import { 
    createMarquee,
    getMarquee,
    updateMarquee,
    deleteMarquee
} from "../controllers/marquee.controller.js";

import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

router.get("/",getMarquee);

router.post("/",
    // authMiddleware,
    createMarquee
);

router.put("/",
    // authMiddleware,
    updateMarquee
);

router.delete("/",
    // authMiddleware,
    deleteMarquee
);

export default router;