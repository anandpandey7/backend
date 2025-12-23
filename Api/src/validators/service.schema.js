import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Short description too short"),
  longDescription: z.string().min(5, "Long description too short")
});
