import { z } from "zod";

/* 🎯 Base Setting Schema (for create) */
export const settingSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  phoneNo: z.string().trim().min(5, "Phone number is required"),
  email: z.string().trim().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(5, "Description is required"),
  productCategory: z.array(z.string().min(1)).optional(),

  // logo will come via multer, so validate as optional string
  companyLogo: z.string().optional(),

  social: z.object({
    facebook: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    youtube: z.string().url().optional().or(z.literal("")),
    pinterest: z.string().url().optional().or(z.literal("")),
    snapchat: z.string().url().optional().or(z.literal("")),
    reddit: z.string().url().optional().or(z.literal("")),
    whatsapp: z.string().optional().or(z.literal("")),
    tumblr: z.string().url().optional().or(z.literal("")),
    googleMyBusiness: z.string().url().optional().or(z.literal("")),
    quora: z.string().url().optional().or(z.literal("")),
    wechat: z.string().optional().or(z.literal("")),
    discord: z.string().url().optional().or(z.literal(""))
  }).optional(),

  colours: z.object({
    primary: z.string().min(3).optional(),
    secondary: z.string().min(3).optional(),
    accent: z.string().min(3).optional(),
    surface: z.string().min(3).optional()
  }).optional()
});


/* ✏️ For edit (partial update allowed) */
export const settingUpdateSchema = settingSchema.partial();
