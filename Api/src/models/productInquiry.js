import mongoose from "mongoose";

const productFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contactNo1: {type: String, required: true},
    contactNo2: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    address: {type: String, required: true},
    organization: {type: String }, // optional field so no required: true
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    responded: {type: Boolean, default: false},
    comment: {type: String, default: null }
}, {timestamps: true});

export default mongoose.model("ProductForm",productFormSchema);