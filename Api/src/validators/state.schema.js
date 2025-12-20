import { z } from "zod";

export const stateSchema = z.object({
  state: z.string().min(2, "State name is required"),
  country: z.string().min(1, "Country ID is required")
});
