import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  description: z.string().min(5, "Description is required"),
  longDescription: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  sellingPrice: z.coerce.number().positive("Price must be positive"),
  productCategory: z.string().min(1, "Product category is required"),
  image: z.string().optional() // handled by multer
});

export const productUpdateSchema = productSchema.partial();
