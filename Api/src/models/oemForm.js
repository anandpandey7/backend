import mongoose from "mongoose";

const oemFormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, required: true },
  contactNo1: { type: String, required: true },
  contactNo2: { type: String, required: true },

  address: { type: String, required: true },
  projectDescription: { type: String, required: true },

  organization: { type: String },

  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true
  },

  projectReport: { type: String }, // address of file

  responded: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("OEMForm", oemFormSchema);
