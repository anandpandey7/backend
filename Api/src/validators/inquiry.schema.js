import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email").optional(),
  domain: z.string().trim().min(1, "Domain/Requirement is required"),
  message: z.string().trim().min(1, "Message is required"),
  country: z.string().trim().min(1, "Country is required"),
  state: z.string().trim().min(1, "State is required"),
  city: z.string().trim().min(1, "City is required"),
  contactNo1: z.string().trim().min(10, "Contact no1 is required"),
  contactNo2: z.string().trim().min(8, "Contact no2 is required")
});

export const inquiryRespondSchema = z.object({
  resolve: z.boolean(),
  comment: z.string().min(1, "Comment is required")
})