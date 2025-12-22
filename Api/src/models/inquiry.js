import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    domain: { type: String, required: true },
    message: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    contactNo1: { type: String, required: true },
    contactNo2: { type: String, required: true },
    resolve: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
