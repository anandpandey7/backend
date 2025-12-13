import mongoose from "mongoose";

// Schema definition
const trustSchema = new mongoose.Schema({
  trustedCompanies: [
    {
      name: {
        type: String,
        required: true // Ensures that the company name is required
      },
      logo: {
        type: String,
        required: true // Ensures that the company logo URL is required
      }
    }
  ],
  stats: {
    enterpriseClients: {
      type: Number,
      required: true,
      min: 0 // Ensures the value can't be negative
    },
    countriesServed: {
      type: Number,
      required: true,
      min: 0 // Ensures the value can't be negative
    },
    customerSatisfaction: {
      type: Number,
      required: true,
      min: 0,
      max: 100 // Assuming satisfaction is a percentage, should be between 0 and 100
    }
  }
});

// Model definition
const Trust = mongoose.model("Trust", trustSchema);

export default Trust;
