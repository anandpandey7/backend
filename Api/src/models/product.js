import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String }, // CKEditor HTML
    price: { type: Number, required: true },
    productCategory: { type: String, required: true },
    image: { type: String, required: true } // image path
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
