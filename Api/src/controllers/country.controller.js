import Country from "../models/country.js";
import { countrySchema } from "../validators/country.schema.js";

export const addCountry = async (req, res) => {
  try {
    const { country, code, telCode } = req.body;
    // Zod validation
    const parsed = countrySchema.safeParse({ country, code, telCode });
    if (!parsed.success) {
        console.log("parsed.error", parsed.error);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.file) {
        console.log("No file uploaded");
      return res.status(400).json({
        success: false,
        message: "Flag image is required"
      });
    }

    const newCountry = new Country({
        country,
        code,
        telCode,
        flag: `/uploads/countries/${req.file.filename}`,
      });

      // Save the country to the database
      await newCountry.save();
    

    res.status(201).json({
      success: true,
      message: "Country added successfully",
      country
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 📥 Get All Countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ company: 1 });

    res.json({
      success: true,
      countries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
