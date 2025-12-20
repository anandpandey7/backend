import State from "../models/state.js";
import Country from "../models/country.js";
import { stateSchema } from "../validators/state.schema.js";

// Add state 
export const addState = async (req, res) => {
  try {
    const { state, country } = req.body;

    const parsed = stateSchema.safeParse({ state, country });
    if (!parsed.success) {
      console.log("error in parsed");
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    // Check country exists
    const countryExists = await Country.findById(country);
    if (!countryExists) {
        console.log("error in countryExists");
      return res.status(400).json({
        success: false,
        message: "Invalid country ID"
      });
    }
    // check if already state exist
    const stateExist = await State.findOne({ state, country });
    if(stateExist){
        return res.status(400).json({
            success: false,
            message: "state with this name already exists"
        });
    }


    const newState = await State.create({
      state,
      country
    });

    res.status(201).json({
      success: true,
      message: "State added successfully",
      state: newState
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// get all states
export const getStates = async (req, res) => {
  try {
    const { countryId } = req.query;

    const filter = countryId ? { country: countryId } : {};

    const states = await State.find(filter)
      .populate("country", "country code")
      .sort({ state: 1 });

    res.json({
      success: true,
      states
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Edit StATe
export const editState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, country } = req.body;

    const parsed = stateSchema.safeParse({ state, country });
    if (!parsed.success) {
        console.log("error in parsed");
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

    const duplicate = await State.findOne({
        state,
        country,
        _id: { $ne: id }
    });

    if (duplicate) {
        return res.status(400).json({
            success: false,
            message: "State already exists in this country"
        });
    }

    const stateData = await State.findByIdAndUpdate(
      id,
      { state, country },
      { new: true }
    );

    if (!stateData) {
      return res.status(404).json({
        success: false,
        message: "State not found"
      });
    }

    res.json({
      success: true,
      message: "State updated successfully",
      stateData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete State 
export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByIdAndDelete(id);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found"
      });
    }

    res.json({
      success: true,
      message: "State deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
