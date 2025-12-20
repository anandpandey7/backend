import express from "express";
import {
  addClientProject,
  getClientProjects,
  editClientProject,
  deleteClientProject
} from "../controllers/clientProject.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import uploadClientProject from "../middleware/uploadClientProject.js";

const router = express.Router();

/* Public */
router.get("/", getClientProjects);

/* Admin */
router.post(
  "/",
//   authMiddleware,
  uploadClientProject.fields([
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  addClientProject
);

router.put(
  "/:id",
//   authMiddleware,
  uploadClientProject.fields([
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  editClientProject
);

router.delete("/:id", 
    // authMiddleware, 
    deleteClientProject);

export default router;
