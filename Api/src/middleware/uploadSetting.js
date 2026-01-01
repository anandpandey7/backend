import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads/settings");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// ================================
// File Filter (STRICT & SAFE)
// ================================
const fileFilter = (req, file, cb) => {
  // Company logo must be image
  if (file.fieldname === "companyLogo") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Company logo must be an image file"),
        false
      );
    }
  }

  // Videos
  if (["video1", "video2"].includes(file.fieldname)) {
    if (!file.mimetype.startsWith("video/")) {
      return cb(
        new Error("Uploaded file must be a video"),
        false
      );
    }
  }

  // Allow file
  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter
});

export default upload;
