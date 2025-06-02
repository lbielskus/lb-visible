import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phoneNumber, subject, message, clientEmail } = req.body;

    console.log('Received form data:', {
      name,
      phoneNumber,
      subject,
      message,
      clientEmail,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_SERVER,
      port: process.env.ZOHO_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.error('Transporter verification failed:', error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      to: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      subject: `New Contact Form Submission - ${subject}`,
      text: `
        Name: ${name}
        Phone Number: ${phoneNumber}
        Subject: ${subject}
        Message: ${message}
        Client Email: ${clientEmail}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Detailed Error:', error.response);
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
