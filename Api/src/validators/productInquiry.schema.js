import { z } from "zod";


export const productInquiryFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  contactNo1: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, "Invalid contact number"),
  contactNo2: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, "Invalid contact number"),
  address: z.string().trim().min(1, "Address is required"),
  message: z.string().trim().min(1, "Message is required"),
  product: z.string(),
  organization: z.string().trim().optional()
});

// export const respondedSchema = z.object({
//   responded: z.boolean(),
//   comment: z.string().trim().min(1, "Comment is required")
// });

export const respondedSchema = z.object({
    responded: z.boolean(),
    comment: z.string().trim().optional()
  })
  .refine(
    data => !data.responded || (data.comment && data.comment.length > 0),
    {
      message: "Comment is required when responded is true",
      path: ["comment"]
    }
  );
