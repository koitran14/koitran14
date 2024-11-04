"use server";

import { ContactFormModel } from "@/schemas/smtp";
import { emailSender } from "@/lib/smtp";
import { IAppResponse } from "@/schemas/global";
import { ZodError } from "zod";

export async function sendContactUsSubmissionTemplate({
  fullname,
  email,
  phone,
  message,
}: {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}): Promise<IAppResponse<any>> {
  try {
    const parsed = ContactFormModel.parse({
      fullname: fullname,
      email: email,
      phone: phone,
      message: message,
    });

    await emailSender.sendMail({
      from: parsed.email,
      to: process.env.EMAIL_USER,
      subject: `[Delta Cognition] New Contact from ${parsed.fullname}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <div style="text-align: center;">
            <h2 style="color: #0033CC; text-align: center; font-size: 22px; margin-bottom: 20px; margin-top:-10px;">New Contact Received</h2>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 15px;">Hello Delta Cognition Team,</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">You&apos;ve received a new inquiry through the contact form. Here are the details:</p>
          
          <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333; width: 30%; border-bottom: 1px solid #e0e0e0;">Full Name:</td>
                <td style="padding: 10px; color: #555; border-bottom: 1px solid #e0e0e0;">${
                  parsed.fullname
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333; border-bottom: 1px solid #e0e0e0;">Email:</td>
                <td style="padding: 10px; color: #555; border-bottom: 1px solid #e0e0e0;">${
                  parsed.email
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333; border-bottom: 1px solid #e0e0e0;">Phone Number:</td>
                <td style="padding: 10px; color: #555; border-bottom: 1px solid #e0e0e0;">${
                  parsed.phone
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333;">Message:</td>
                <td style="padding: 10px; color: #555;">${parsed.message}</td>
              </tr>
            </table>
          </div>
        
          <p style="font-size: 16px; color: #555; margin-top: 20px;">For follow-up, please use the contact information below:</p>
          <div style="padding: 15px; background-color: #eef2ff; border-radius: 8px; font-size: 16px; border: 1px solid #d3d9f2; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0033CC;">${
              parsed.fullname
            }</p>
            <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${
              parsed.email
            }" style="color: #0033CC; text-decoration: none;">${
        parsed.email
      }</a></p>
            <p style="margin: 5px 0; color: #555;"><strong>Phone:</strong> ${
              parsed.phone
            }</p>
          </div>
        
          <footer style="font-size: 12px; color: #888; text-align: center; margin-top: 30px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
            &copy; ${new Date().getFullYear()} Delta Cognition. All rights reserved.
          </footer>
        </div>
      `,
    });

    await emailSender.sendMail({
      from: process.env.EMAIL_USER, // Use your company's email as the sender
      to: parsed.email,
      subject: "Thank You for Reaching Out!",
      attachments: [
        {
          filename: "twitter.png",
          path: "./public/icons/twitter.png",
          contentDisposition: "inline",
          cid: "twitter.png",
          contentType: "image/png",
        },
        {
          filename: "linkedin.png",
          path: "./public/icons/linkedin.png",
          contentDisposition: "inline",
          cid: "linkedin.png",
          contentType: "image/png",
        },
        {
          filename: "facebook.png",
          path: "./public/icons/facebook.png",
          contentDisposition: "inline",
          cid: "facebook.png",
          contentType: "image/png",
        },
        {
          filename: "github.png",
          path: "./public/icons/github.png",
          contentDisposition: "inline",
          cid: "github.png",
          contentType: "image/png",
        },
        {
          filename: "discord.png",
          path: "./public/icons/discord.png",
          contentDisposition: "inline",
          cid: "discord.png",
          contentType: "image/png",
        },
      ],
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background-color: #f9fafb;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; color: #333;">
          <h2 style="color: #0077cc; font-size: 24px; margin-bottom: 20px; text-align: center;">Thank You for Contacting Me!</h2>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Dear <strong style="color: #0077cc;">${parsed.fullname}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Thank you for reaching out! I truly appreciate your message and am excited to connect with you. I will get back to you as soon as possible.
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            If you have any urgent questions or need immediate assistance, please feel free to contact me directly at 
            <a href="mailto:tndkhoi.work@gmail.com" style="color: #0077cc; text-decoration: none; font-weight: bold;">tndkhoi.work@gmail.com</a>.
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Looking forward to chatting with you soon!
          </p>
        </div>
    
        <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 10px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #0077cc;">Tran Ngoc Dang Khoi</strong>
          </p>
          <div style="margin-top: 20px; text-align: center;">
            <a href="https://twitter.com" style="margin: 0 10px;">
              <img src="cid:twitter.png" alt="Twitter" style="width: 24px; height: 24px;" />
            </a>
            <a href="https://linkedin.com" style="margin: 0 10px;">
              <img src="cid:linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;" />
            </a>
            <a href="https://facebook.com" style="margin: 0 10px;">
              <img src="cid:facebook.png" alt="Facebook" style="width: 24px; height: 24px;" />
            </a>
            <a href="https://github.com" style="margin: 0 10px;">
              <img src="cid:github.png" alt="GitHub" style="width: 24px; height: 24px;" />
            </a>
            <a href="https://discord.gg" style="margin: 0 10px;">
              <img src="cid:discord.png" alt="Discord" style="width: 24px; height: 24px;" />
            </a>
          </div>
        </div>
        
        <footer style="font-size: 12px; color: #888; margin-top: 20px; padding-top: 10px; text-align: center;">
          &copy; ${new Date().getFullYear()} Tran Ngoc Dang Khoi. All rights reserved.
        </footer>
      </div>
    `,
    });
    
    

    return { isSuccess: true };
  } catch (err) {
    let error;
    if (err instanceof ZodError) {
      error = err.errors[0].message;
    } else {
      error =
        err instanceof Error
          ? err.message
          : "Failed to send contact submission to the company";
    }

    return { isSuccess: false, message: error };
  }
}
