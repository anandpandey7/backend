import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/trust");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;


// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// // Fix __dirname in ES6
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure uploads folder exists
// const uploadFolder = path.join(__dirname, "uploads/trust");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadFolder);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, uniqueName + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// export default upload;
