import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://adminX:LugO7N9je8oK7SZr@cluster0.fzbgr1d.mongodb.net/dharti_automation");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
