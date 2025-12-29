import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyLogo: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    productCategory: {
      type: [String],
      default: [],
    },
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
    },
    colours: {
    primary:   { type: String, default: "#000000" }, // text / headings
    secondary: { type: String, default: "#FFFFFF" }, // main background
    accent:    { type: String, default: "#4935fcff" }, // CTA / highlights
    surface:   { type: String, default: "#12a602ff" }  // cards / sections
  }

  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
