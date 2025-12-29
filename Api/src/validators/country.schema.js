// import { z } from "zod";

// export const countrySchema = z.object({
//   country: z.string().min(1, "Country name required"),
//   code: z.string().min(2, "Country code required"),
//   telCode: z.string().min(1, "Telephone code required"),
//   flag: z.string().url("Logo must be a valid URL").optional()
// });

import { z } from "zod";

export const countrySchema = z.object({
  country: z
    .string()
    .trim()
    .min(1, "Country name required"),

  code: z
    .string()
    .trim()
    .min(2, "Country code required"),

  telCode: z
    .string()
    .trim()
    .min(1, "Telephone code required"),
});

