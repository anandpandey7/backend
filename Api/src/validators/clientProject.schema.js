import { z } from "zod";

export const clientProjectSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone is required"),

  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(1, "Project description is required"),

  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.string().optional(),

  feedback: z.string().optional(),
  rating: z.string().optional()
});
