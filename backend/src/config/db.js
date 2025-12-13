import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await 
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
