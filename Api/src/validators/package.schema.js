import { z } from "zod";

export const packageFeatureZod = z.object({
  feature: z.string().min(1, "Feature is required"),
  value: z.union([
    z.boolean(),
    z.string(),
    z.number()
  ])
});

export const packageSchema = z.object({
  service: z.string(),
  name: z.string().min(1, "Package name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  sellingPrice: z.coerce.number().positive("Selling price must be positive"),
  isPopular: z.boolean().optional(),
  description: z.string().min(1, "Description is required"),
  servicesOffered: z.array(packageFeatureZod).optional()
});

export const packageUpdateSchema = packageSchema.partial();
