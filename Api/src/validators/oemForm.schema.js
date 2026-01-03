import { z } from "zod";

export const oemFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  email: z.string().email(),
  contactNo1: z.string().min(8),
  contactNo2: z.string(),

  address: z.string(),
  projectDescription: z.string(),

  organization: z.string().optional(),
  domain: z.string()
});

export const respondedSchema = z.object({
  responded: z.boolean()
});
