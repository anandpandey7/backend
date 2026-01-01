import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, required: true },

    requirements: [{ type: String, required: true }],
    responsibilities: [{ type: String, required: true }],

    location: {
      type: {
        type: String,
        enum: ["Remote", "On-site", "Hybrid"],
        required: true
      },
      city: { type: String },
      state: { type: String }
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true
    },

    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "INR" },
      isVisible: { type: Boolean, default: true }
    },

    category: { type: String, required: true },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid-Level", "Senior"],
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active"
    },

    applicationDeadline: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
