const { z } = require("zod");

// Company schema
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  logo: z.string().url("Logo must be a valid URL")
});

// Stats schema (OPTIONAL)
const statsSchema = z.object({
  enterpriseClients: z.number().int().nonnegative(),
  countriesServed: z.number().int().nonnegative(),
  customerSatisfaction: z.number().min(0).max(5)
});

// Main schema
const trustSchema = z.object({
  trustedCompanies: z.array(companySchema).min(1),
  stats: statsSchema.optional()
});

module.exports = {
  trustSchema
};
