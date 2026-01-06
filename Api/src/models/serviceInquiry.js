import mongoose from "mongoose";

const oemFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contactNo1: {type: String, required: true},
    contactNo2: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    address: {type: String, required: true},
    organization: {type: String }, // optional field so no required: true
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    responded: {
      type: Boolean,
      default: false
    }
}, {timestamps: true});

export default mongoose.model("ServiceForm",oemFormSchema);