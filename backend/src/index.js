import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import trustRoutes from "./routes/trust.routes.js";

// dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trust", trustRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Dharti Automation Backend API is running...");
});

// Server Listener
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
