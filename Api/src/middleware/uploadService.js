// NOTE: This code is comment out and improved with the help of LLMs(like claud, ChatGPT) but I have full KNowledge of my code
// I have use LLMs to learn how professional programmers write code, although all initial codes are written by me and I have spend alot of time 
// in improving and adding new fields in many routes by my own ------------------------ please read this

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/services"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

const uploadService = multer({ storage, fileFilter });

export const serviceUploadFields = uploadService.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery", maxCount: 10 }
]);

export default uploadService;


