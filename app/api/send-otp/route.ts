// route.ts (Next.js 13+ app router)
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  // Save the OTP in DB or cache like Redis with expiry (not shown here)

  // Configure your SMTP transport (e.g. Gmail or your provider)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your email password or app password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <b>${otp}</b></p>`,
    });

    return NextResponse.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
  }
}
