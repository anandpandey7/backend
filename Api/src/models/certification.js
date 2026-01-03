import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },

    logos: [
      {
        type: String // image paths
      }
    ],

    certificates: [
      {
        type: String // image paths
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
