import { NextRequest, NextResponse } from "next/server";

import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
    console.log('post working')

    try {
        const { to, text } = await req.json();

        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });


        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to,
            subject: "Verification Code",
            text,
            html: "<b>Verification Code</b>",
        });

        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ message: 'Email Sent' })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}