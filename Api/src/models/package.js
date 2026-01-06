import mongoose from "mongoose";

const packageFeatureSchema = new mongoose.Schema(
  {
    feature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    sellingPrice: {
      type: Number,
      required: true
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true,
    },
    servicesOffered: {
      type: [packageFeatureSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
