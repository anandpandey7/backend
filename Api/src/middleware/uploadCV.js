import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/cv",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const uploadCV = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.test(ext)
      ? cb(null, true)
      : cb(new Error("Only PDF/DOC files allowed"));
  }
});
