import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Get __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
// dotenv.config();

// Connect MongoDB
connectDB();

// Routes
import authRoutes from "./routes/auth.routes.js";
import trustRoutes from "./routes/trust.routes.js";
import countryRoutes from "./routes/country.routes.js";
import postRoutes from "./routes/post.routes.js";
import stateRoutes from "./routes/state.routes.js";
import cityRoutes from "./routes/city.routes.js";
import clientProjectRoutes from "./routes/clientProject.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import ckeditorRoutes from "./routes/ckeditor.routes.js";




const app = express();

/* =====================
   Global Middleware
===================== */
// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (important for forms)
app.use(express.urlencoded({ extended: true }));


/* =====================
   Static File Serving
===================== */
// Make uploads folder publicly accessible
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =====================
   API Routes
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/clients", clientProjectRoutes);
app.use("/api/portfolio",portfolioRoutes);
app.use("/api/testimonials",testimonialRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/settings",settingRoutes);
app.use("/api/ckeditor", ckeditorRoutes);

/* =====================
   Health Check
===================== */
app.get("/", (req, res) => {
  res.json({ message: "Dharti Automation Backend Running 🚀" });
});

/* =====================
   Error Handling 
===================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

/* =====================
   Server Start
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);  // Fixed: was using template literal incorrectly
});


