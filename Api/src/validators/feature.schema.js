import { z } from "zod";

export const featureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["boolean", "input"])
});

export const featureUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  type: z.enum(["boolean", "input"]).optional()
});
