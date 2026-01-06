import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["boolean", "input"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Feature", featureSchema);
