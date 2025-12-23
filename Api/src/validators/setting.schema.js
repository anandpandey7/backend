import { z } from "zod";

export const settingSchema = z.object({
  companyName: z.string().min(2),
  phoneNo: z.string().min(5),
  email: z.string().email(),
  location: z.string().min(2),
  description: z.string().min(5),

  social: z.object({
    facebook: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    youtube: z.string().url().optional().or(z.literal("")),
    pinterest: z.string().url().optional().or(z.literal("")),
    snapchat: z.string().url().optional().or(z.literal("")),
    reddit: z.string().url().optional().or(z.literal("")),
    whatsapp: z.string().optional(),
    tumblr: z.string().url().optional().or(z.literal("")),
    googleMyBusiness: z.string().url().optional().or(z.literal("")),
    quora: z.string().url().optional().or(z.literal("")),
    wechat: z.string().optional(),
    discord: z.string().url().optional().or(z.literal(""))
  }).optional()
});

/* For edit (partial) */
export const settingUpdateSchema = settingSchema.partial();
