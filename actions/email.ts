"use server";

import { ContactFormModel } from "@/schemas/smtp";
import { emailSender } from "@/lib/smtp";
import { IAppResponse } from "@/schemas/global";
import { ZodError } from "zod";

const logoUrl = "https://deltacognition.com/assets/logo.svg";

export async function sendContactUsSubmissionTemplate({
  fullname,
  email,
  phone,
  subject,
  message,
}: {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<IAppResponse<any>> {
  try {
    const parsed = ContactFormModel.parse({
      fullname: fullname,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    });

    await emailSender.sendMail({
      from: parsed.email,
      to: process.env.EMAIL_USER,
      subject: `[Delta Cognition] New Contact from ${parsed.fullname}`,
      attachments: [
        {
          filename: "delta.png",
          path: "./public/delta.png",
          contentDisposition: "inline",
          cid: "delta.png", //same cid value as in the html img src
          contentType: "image/png",
        },
      ],
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <div style="text-align: center;">
            <img src="cid:delta.png" alt="Delta Cognition Logo" style="width: 160px;" />
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
                <td style="padding: 10px; font-weight: bold; color: #333; border-bottom: 1px solid #e0e0e0;">Subject:</td>
                <td style="padding: 10px; color: #555; border-bottom: 1px solid #e0e0e0;">${
                  parsed.subject
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
      subject: "Thank You for Contacting Delta Cognition",
      attachments: [
        {
          filename: "delta.png",
          path: "./public/delta.png",
          contentDisposition: "inline",
          cid: "delta.png", //same cid value as in the html img src
          contentType: "image/png",
        },
        {
          filename: "twitter.png",
          path: "./public/icons/twitter.png",
          contentDisposition: "inline",
          cid: "twitter.png", //same cid value as in the html img src
          contentType: "image/png",
        },
        {
          filename: "linkedin.png",
          path: "./public/icons/linkedin.png",
          contentDisposition: "inline",
          cid: "linkedin.png", //same cid value as in the html img src
          contentType: "image/png",
        },
        {
          filename: "facebook.png",
          path: "./public/icons/facebook.png",
          contentDisposition: "inline",
          cid: "facebook.png", //same cid value as in the html img src
          contentType: "image/png",
        },
        {
          filename: "github.png",
          path: "./public/icons/github.png",
          contentDisposition: "inline",
          cid: "github.png", //same cid value as in the html img src
          contentType: "image/png",
        },
        {
          filename: "discord.png",
          path: "./public/icons/discord.png",
          contentDisposition: "inline",
          cid: "discord.png", //same cid value as in the html img src
          contentType: "image/png",
        },
      ],
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background-color: #ffffff;">
    
    <div style="background-color: #f7fbff; padding: 20px; border-radius: 10px; color: #333;">
      <div style="">
        <img src="cid:delta.png" alt="Delta Cognition Logo" style="width: 180px;" />
      </div>
      
      <h2 style="color: #0033CC;  font-size: 24px; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
      <p style="font-size: 16px; color: #333; line-height: 1.6;  ">
        Dear <strong>${parsed.fullname}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #555;  ">
        Thank you for reaching out to us! We are delighted to hear from you.
      </p>
      
      <p style="font-size: 16px; color: #0056b3; font-weight: bold;  ">
        Your message is important to us, and our team is currently reviewing it. We aim to respond within <strong>24-48 hours</strong>.
      </p>
      
      <p style="font-size: 16px; color: #555;  ">
        If you have any urgent questions, please feel free to reach out to us at 
        <a href="mailto:hello@deltacognition.com" style="color: #0033CC; text-decoration: none; font-weight: bold;">hello@deltacognition.com</a>.
      </p>
      
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        We appreciate your interest in Delta Cognition and look forward to assisting you!
      </p>
    </div>

    <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 10px;">
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        Best regards,<br>
        <strong>Delta Cognition Team</strong>
      </p>
       <div style="margin-top: 20px;">
              <a href="https://linkedin.com/company/delta-cognition" style="text-decoration: none; margin: 0 10px 0 0 ;">
                <img src="cid:linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;"  />
              </a>
              <a href="https://facebook.com/delta-cognition" style="text-decoration: none; margin: 0 10px 0 0 ;">
                <img src="cid:facebook.png" alt="Facebook" style="width: 24px; height: 24px;"  />
              </a>
              <a href="https://github.com/deltacognition" style="text-decoration: none; margin: 0 10px 0 0 ;">
                <img src="cid:github.png" alt="GitHub" style="width: 24px; height: 24px;"  />
              </a>
              <a href="https://discord.gg/delta-cognition" style="text-decoration: none; margin: 0 10px 0 0 ;">
                <img src="cid:discord.png" alt="Discord" style="width: 24px; height: 24px;"  />
              </a>
              <a href="https://twitter.com/delta_cognition" style="text-decoration: none; margin: 0 10px 0 0 ;">
                <img src="cid:twitter.png" alt="Twitter" style="width: 24px; height: 24px;"  />
              </a>
            </div>
    </div>
    
    <footer style="font-size: 12px; color: #888; margin-top: 20px; padding-top: 10px;">
      &copy; ${new Date().getFullYear()} Delta Cognition. All rights reserved.
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
