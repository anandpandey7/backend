import { merge } from "zod/mini";
import Trust from "../models/trust.js";
import { trustSchema } from "../validators/trust.validation.js";

export const upsertTrustData = async (req, res) => {
  try {
    // const trustedCompanies = JSON.parse(req.body.trustedCompanies);

    let trustedCompanies;
    try {
      trustedCompanies = JSON.parse(req.body.trustedCompanies);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid trustedCompanies JSON" });
    }
    const stats = req.body.stats ? JSON.parse(req.body.stats) : undefined;

    // console.log(req.files);

    // Zod validation
    const parsed = trustSchema.safeParse({
      trustedCompanies,
      stats
    });

    if (!parsed.success) {
      // console.log("Zod validation failed:", parsed.error.errors);
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    if (!req.files || req.files.length !== trustedCompanies.length) {
      // console.log("File count mismatch:", req.files, trustedCompanies);
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
      const existingCompanies = trustData.trustedCompanies || [];
      const mergedCompanies = [...existingCompanies];
      companiesWithLogos.forEach(newCompany => {
        const index = mergedCompanies.findIndex(c => c.name === newCompany.name);
        if (index > -1) {
          // Update logo if company exists
          mergedCompanies[index].logo = newCompany.logo;
        } else {
          // Add new company
          mergedCompanies.push(newCompany);
        }
      });

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

