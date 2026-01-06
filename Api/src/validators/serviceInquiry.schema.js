import { z } from "zod";

export const servicesInquiryFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  contactNo1: z.string().min(8),
  contactNo2: z.string().min(10),
  address: z.string(),
  message: z.string(),
  service: z.string(),
  organization: z.string().optional()
});

export const respondedSchema = z.object({
  responded: z.boolean()
});
