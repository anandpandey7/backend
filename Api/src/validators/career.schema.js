import { z } from "zod";

export const careerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  details: z.string().optional(),
  jobId: z.string().optional(),
  jobTitle: z.string().optional()
});

// export const careerUpdateSchema = z.object({
//   responded: z.boolean().optional()
// });

export const careerUpdateSchema = z.object({
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
