import "server-only";

import nodemailer from "nodemailer";

export const emailSender = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? Number.parseInt(process.env.EMAIL_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
