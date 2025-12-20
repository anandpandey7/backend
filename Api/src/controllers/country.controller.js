import Country from "../models/country.js";
import { countrySchema } from "../validators/country.schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* =========================
   Fix __dirname for ESModules
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add Country
export const addCountry = async (req, res) => {
  try {
    const { country, code, telCode } = req.body;

    // Zod validation
    const parsed = countrySchema.safeParse({ country, code, telCode });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }
    // check country is unique
    const existingCountry = await Country.findOne({ country });
    if (existingCountry) {
      return res.status(400).json({
        success: false,
        message: "Country with this name already exists"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Flag image is required"
      });
    }

    const newCountry = new Country({
      country,
      code,
      telCode,
      flag: `/uploads/countries/${req.file.filename}`
    });

    await newCountry.save();

    res.status(201).json({
      success: true,
      message: "Country added successfully",
      country: newCountry
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ country: 1 });

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

// Edit country
export const editCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, code, telCode } = req.body;

    const parsed = countrySchema.safeParse({ country, code, telCode });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const existingCountry = await Country.findById(id);
    if (!existingCountry) {
      return res.status(404).json({
        success: false,
        message: "Country not found"
      });
    }

    // checking dubliacte name if already exist
    const duplicate = await Country.findOne({
      country,
      _id: { $ne: id }
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Country with this name already exists"
      });
    }


    // If new flag uploaded → delete old flag
    if (req.file) {
      const oldFlagPath = path.join(
        __dirname,
        "..",
        existingCountry.flag
      );

      if (fs.existsSync(oldFlagPath)) {
        fs.unlinkSync(oldFlagPath);
      }

      existingCountry.flag = `/uploads/countries/${req.file.filename}`;
    }

    existingCountry.country = country;
    existingCountry.code = code;
    existingCountry.telCode = telCode;

    await existingCountry.save();

    res.json({
      success: true,
      message: "Country updated successfully",
      country: existingCountry
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete country
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found"
      });
    }

    // Delete flag image from disk
    const flagPath = path.join(__dirname, "..", country.flag);
    if (fs.existsSync(flagPath)) {
      fs.unlinkSync(flagPath);
    }

    await country.deleteOne();

    res.json({
      success: true,
      message: "Country deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
