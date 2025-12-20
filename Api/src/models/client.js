import mongoose from "mongoose";

const clientProjectSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    projectName: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },

    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: Number },

    feedback: { type: String },
    rating: { type: Number, min: 0, max: 5 },

    logo: { type: String, required: true }, // image path
    gallery: [{ type: String }] // image paths
  },
  { timestamps: true }
);

export default mongoose.model("ClientProject", clientProjectSchema);
