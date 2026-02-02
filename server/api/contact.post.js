import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, company, budget, message } = body

  // Validate required fields
  if (!firstName || !lastName || !email || !budget || !message) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_KEY
    }
  })

  try {
    await transporter.sendMail({
      from: '"Booold Studio Website" <hello@boooldstudio.com>',
      to: 'hello@boooldstudio.com',
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `New inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email'
    })
  }
})
