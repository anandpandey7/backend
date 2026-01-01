import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(1),

  requirements: z.array(z.string().min(1)),
  responsibilities: z.array(z.string().min(1)),

  location: z.object({
    type: z.enum(["Remote", "On-site", "Hybrid"]),
    city: z.string().optional(),
    state: z.string().optional()
  }),

  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship"
  ]),

  salary: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().default("INR"),
      isVisible: z.boolean().default(true)
    })
    .optional(),

  category: z.string().min(1),

  experienceLevel: z.enum(["Junior", "Mid-Level", "Senior"]).optional(),

  status: z.enum(["Active", "Closed", "Draft"]).optional(),

  applicationDeadline: z.string().optional()

});

export const jobUpdateSchema = jobSchema.partial();
