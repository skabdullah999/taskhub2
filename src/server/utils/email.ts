import nodemailer from "nodemailer"
import { logger } from "./logger"

interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

// Create transporter
const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    // Production email service (e.g., SendGrid, AWS SES, etc.)
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  } else {
    // Development email service (ethereal.email)
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.DEV_EMAIL_USER || "ethereal_user",
        pass: process.env.DEV_EMAIL_PASS || "ethereal_pass",
      },
    })
  }
}

// Send email
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || "TaskHub <noreply@taskhub.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    }

    const info = await transporter.sendMail(mailOptions)

    if (process.env.NODE_ENV !== "production") {
      logger.info(`Email preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    }

    logger.info(`Email sent to ${options.to}: ${options.subject}`)
  } catch (error) {
    logger.error("Error sending email:", error)
    throw error
  }
}
