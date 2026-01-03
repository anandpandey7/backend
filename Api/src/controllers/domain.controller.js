import Domain from "../models/domain.js";

// for adding domain
export const createDomain = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Domain name is required"
      });
    }

    // dublicate ke liye
    const exists = await Domain.findOne({ name: name.trim() });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Domain already exists"
      });
    }

    const domain = await Domain.create({ name: name.trim() });

    res.status(201).json({
      success: true,
      domain
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// for GET
export const getDomains = async (_, res) => {
  try {
    const domains = await Domain.find().sort({ name: 1 });

    res.json({
      success: true,
      domains
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// for UPDATE, rarerly used, per bana diye fir v
export const updateDomain = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Domain name is required"
      });
    }

    const domain = await Domain.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // just for receiving new data instead of old data not updated data
    );

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: "Domain not found"
      });
    }

    res.json({
      success: true,
      domain
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// delete
export const deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findByIdAndDelete(req.params.id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: "Domain not found"
      });
    }

    res.json({
      success: true,
      message: "Domain deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
