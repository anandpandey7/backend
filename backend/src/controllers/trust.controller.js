import Trust from "../models/trust.js";

export const getTrustData = async (req, res) => {
  try {
    const trustData = await Trust.findOne();

    if (!trustData) {
      return res.status(404).json({
        success: false,
        message: "Trust data not found"
      });
    }

    return res.status(200).json({
      success: true,
      trustedCompanies: trustData.trustedCompanies,
      stats: trustData.stats
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



