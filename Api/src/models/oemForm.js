import mongoose from "mongoose";

const oemFormSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    contactNo1: {type: String, required: true},
    contactNo2: {type: String, required: true},
    email: {type: String, required: true},
    projectDescription: {type: String, required: true},
    address: {type: String, required: true},
    organization: {type: String }, // optional field so no required: true
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true
    },
    projectReport: {type: String }, // for address of file, which is hosted on backend

    responded: {
      type: Boolean,
      default: false
    },
    comment: {type: String, default: null}
}, {timestamps: true});

export default mongoose.model("OEMForm",oemFormSchema);