import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required")
});


