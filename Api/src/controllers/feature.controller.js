import Feature from "../models/feature.js";
import { featureSchema,featureUpdateSchema } from "../validators/feature.schema.js";


// CREATE all features

export const createFeature = async (req, res) => {
  try {
    const parsed = featureSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const feature = await Feature.create(parsed.data);

    res.status(201).json({
      success: true,
      message: "Feature created",
      feature
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL FEATURES

export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });

    res.json({ success: true, features });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE FEATURE

export const updateFeature = async (req, res) => {
  try {
    const parsed = featureUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      parsed.data,
      { new: true }
    );

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found"
      });
    }

    res.json({
      success: true,
      message: "Feature updated",
      feature
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE FEATURE

export const deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found"
      });
    }

    res.json({
      success: true,
      message: "Feature deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
