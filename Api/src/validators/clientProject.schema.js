import { z } from "zod";

export const clientProjectSchema = z.object({
  clientName: z.string().trim().min(1, "Client name is required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().min(5, "Phone is required"),

  projectName: z.string().trim().min(1, "Project name is required"),
  projectDescription: z.string().trim().min(1, "Project description is required"),
  projectLongDescription: z.string().optional(), // For Storing HTML which will display on click

  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  budget: z.string().trim().optional(),

  feedback: z.string().trim().optional(),
  rating: z.string().trim().optional()
});
