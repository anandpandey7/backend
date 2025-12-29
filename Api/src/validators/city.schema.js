import { z } from "zod";

export const citySchema = z.object({
  city: z.string().trim().min(2, "City is required"),
  country: z.string().trim().min(1, "Country ID is required"),
  state: z.string().trim().min(1, "State ID is required")
});
