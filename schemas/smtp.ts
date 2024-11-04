import { z } from "zod";

export const OTPModel = z.object({
  otp: z.string().length(6),
  email: z.string().email(),
});

export const ContactFormModel = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number. Please use an international format (e.g., +1234567890)",
    )
    .optional(),
  subject: z.enum(["General Inquiry", "Feature Request", "General Feedback"]),
  message: z.string().min(1, "Message is required"),
});
