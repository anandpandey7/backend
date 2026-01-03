// NOTE: This code is comment out and improved with the help of LLMs(like claud, ChatGPT) but I have full KNowledge of my code
// I have use LLMs to learn how professional programmers write code, although all initial codes are written by me and I have spend alot of time 
// in improving and adding new fields in many routes by my own ------------------------ please read this

import City from "../models/city.js";
import Country from "../models/country.js";
import State from "../models/state.js";
import { citySchema } from "../validators/city.schema.js";

/* =========================
   ➕ Add City
========================= */
export const addCity = async (req, res) => {
  try {
    const { city, country, state } = req.body;

    const parsed = citySchema.safeParse({ city, country, state });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    // Check country exists
    const countryExists = await Country.findById(country);
    if (!countryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid country ID"
      });
    }

    // Check state exists and belongs to country
    const stateExists = await State.findOne({ _id: state, country });
    if (!stateExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid state for this country"
      });
    }

    // if city already exists in the same state & country
    const cityExists = await City.findOne({ city, state, country });
    if (cityExists) {
      return res.status(400).json({
        success: false,
        message: "City already exists in this state and country"
      });
    }

    const newCity = await City.create({
      city,
      country,
      state
    });

    res.status(201).json({
      success: true,
      message: "City added successfully",
      city: newCity
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   📥 Get Cities
   (filter by state/country)
========================= */
export const getCities = async (req, res) => {
  try {
    const { countryId, stateId } = req.query;

    const filter = {};
    if (countryId) filter.country = countryId;
    if (stateId) filter.state = stateId;

    const cities = await City.find(filter)
      .populate("country", "country code")
      .populate("state", "name")
      .sort({ city: 1 });

    res.json({
      success: true,
      cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ✏️ Edit City
========================= */
export const editCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, country, state } = req.body;

    const parsed = citySchema.safeParse({ city, country, state });
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    // Validate country & state relation
    const stateExists = await State.findOne({ _id: state, country });
    if (!stateExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid state for this country"
      });
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { city, country, state },
      { new: true }
    );

    if (!updatedCity) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    res.json({
      success: true,
      message: "City updated successfully",
      city: updatedCity
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   🗑️ Delete City
========================= */
export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findByIdAndDelete(id);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    res.json({
      success: true,
      message: "City deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
