import { z } from "zod";
import mongoose from "mongoose";

export const oemFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  email: z.string().email(),
  contactNo1: z.string().min(8),
  contactNo2: z.string(),

  address: z.string(),
  projectDescription: z.string(),

  organization: z.string().optional(),
  // domain: z.string()

  domain: z.string().refine(
    val => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid domain ID" }
  )
});

// export const respondedSchema = z.object({
//   responded: z.boolean()
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


