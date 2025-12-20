import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("City", citySchema);
