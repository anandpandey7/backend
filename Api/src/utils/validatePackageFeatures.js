import Feature from "../models/feature.js";

export const validatePackageFeatures = async (servicesOffered) => {
  for (const item of servicesOffered) {
    const feature = await Feature.findById(item.feature);

    if (!feature) {
      throw new Error("Invalid feature selected");
    }

    // BOOLEAN FEATURE
    if (feature.type === "boolean") {
      if (typeof item.value !== "boolean") {
        throw new Error(
          `Feature "${feature.title}" only accepts boolean value`
        );
      }
    }

    // INPUT FEATURE
    if (feature.type === "input") {
      if (
        typeof item.value !== "string" &&
        typeof item.value !== "number"
      ) {
        throw new Error(
          `Feature "${feature.title}" requires input value`
        );
      }
    }
  }
};
