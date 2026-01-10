import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    details: {
      type: String
    },

    cv: {
      type: String, // file path
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null
    },

    jobTitle: {
      type: String,
      default: null
    },

    responded: {
      type: Boolean,
      default: false
    },
    comment: {type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("CareerApplication", careerApplicationSchema);
