import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional(),
  domain: z.string().min(1, "Domain/Requirement is required"),
  message: z.string().min(1, "Message is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  contactNo1: z.string().min(10, "Contact no1 is required"),
  contactNo2: z.string().min(10, "Contact no2 is required")
});
