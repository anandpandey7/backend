import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema({
    items: {
        type: [String],
        required: true,
        trim: true,
    }
},{timestamps: true});

export default  mongoose.model("Marquee", marqueeSchema); 