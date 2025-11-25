"use server"

import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    })

    // Send email to admin
    await resend.emails.send({
      from: 'Lumin8 <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'admin@lumin8.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Lumin8 <onboarding@resend.dev>',
      to: data.email,
      subject: 'Thank you for contacting Lumin8',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${data.message}</p>
        <br/>
        <p>Best regards,<br/>The Lumin8 Team</p>
      `,
    })

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}
