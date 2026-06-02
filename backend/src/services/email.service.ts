import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

const transporter = env.EMAIL_HOST
  ? nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_PORT === 465,
      auth: env.EMAIL_USER && env.EMAIL_PASSWORD ? { user: env.EMAIL_USER, pass: env.EMAIL_PASSWORD } : undefined
    })
  : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!transporter) {
    logger.info({ to, subject }, "Email skipped because SMTP is not configured");
    return;
  }

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html
  });
}

export const emailTemplates = {
  welcome: (name: string) => `<p>Namaste ${name}, welcome to ARCHINEPAL.</p>`,
  verify: (url: string) => `<p>Verify your ARCHINEPAL account: <a href="${url}">${url}</a></p>`,
  resetPassword: (url: string) => `<p>Reset your password: <a href="${url}">${url}</a></p>`,
  jobAlert: (title: string) => `<p>A new job matches your profile: ${title}</p>`,
  eventReminder: (title: string) => `<p>Reminder: ${title} is coming up.</p>`
};
