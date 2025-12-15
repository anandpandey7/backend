import Trust from "../models/trust.js";
import { trustSchema } from "../validators/trust.validation.js";

export const upsertTrustData = async (req, res) => {
  try {
    const trustedCompanies = JSON.parse(req.body.trustedCompanies);
    const stats = req.body.stats ? JSON.parse(req.body.stats) : undefined;

    // Zod validation
    const parsed = trustSchema.safeParse({
      trustedCompanies,
      stats
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.files || req.files.length !== trustedCompanies.length) {
      return res.status(400).json({
        success: false,
        message: "Each company must have one logo"
      });
    }

    // Map files to companies
    const companiesWithLogos = trustedCompanies.map((company, index) => ({
      name: company.name,
      logo: `/uploads/trust/${req.files[index].filename}`
    }));

    let trustData = await Trust.findOne();

    if (trustData) {
      trustData.trustedCompanies = companiesWithLogos;
      if (stats) trustData.stats = stats;
      await trustData.save();
    } else {
      trustData = await Trust.create({
        trustedCompanies: companiesWithLogos,
        stats
      });
    }

    res.json({
      success: true,
      message: "Trust data saved successfully",
      trustData
    });

  } 
  // catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message
  //   });
  catch (error) {
  console.error(error); // full stack trace
  res.status(500).json({
    success: false,
    message: error.message
  });
  }
};

