import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true
    }
  },
  { timestamps: true }
);
const State = mongoose.model("State", stateSchema);

export default State;
