import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phoneNumber, subject, message, clientEmail } = req.body;

  if (!name || !phoneNumber || !subject || !message || !clientEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_SERVER, // example: smtp.zoho.eu
      port: Number(process.env.ZOHO_SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME, // example: info@lbvisible.com
        pass: process.env.MAIL_PASS, // app-specific password
      },
    });

    const mailOptions = {
      from: `LB Visible <${process.env.NEXT_PUBLIC_EMAIL_USERNAME}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      replyTo: clientEmail,
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <h2>Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
}
