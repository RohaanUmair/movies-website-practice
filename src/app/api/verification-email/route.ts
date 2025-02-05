import { NextRequest, NextResponse } from "next/server";

import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
    console.log('post working')

    try {
        const { to, text } = await req.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });


        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to,
            subject: "Verification Code",
            text,
            html: `<p>Your OTP is: <b>${text}</b></p>`,
        }).then(() => console.log('Email sent'))

        return NextResponse.json({ message: 'Email Sent' })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}