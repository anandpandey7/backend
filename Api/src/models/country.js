import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    telCode: {
      type: String,
      required: true
    },
    flag: {
      type: String, // image URL/path
      required: true
    }
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);
export default Country;
