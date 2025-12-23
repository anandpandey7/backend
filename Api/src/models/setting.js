import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyLogo: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },

    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      pinterest: { type: String, default: "" },
      snapchat: { type: String, default: "" },
      reddit: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      tumblr: { type: String, default: "" },
      googleMyBusiness: { type: String, default: "" },
      quora: { type: String, default: "" },
      wechat: { type: String, default: "" },
      discord: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
