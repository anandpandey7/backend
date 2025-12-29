import { z } from "zod";

export const adminSignupSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters")
});

export const adminSigninSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(1, "Password is required")
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().trim().min(1, "Old password is required"),
  newPassword: z.string().trim().min(6, "New password must be at least 6 characters")
});
