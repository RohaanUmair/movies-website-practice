import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
    try {
        await connectToDb();

        const { to, text } = await req.json();

        const userExistence = await User.findOne({ email: to });

        if (userExistence) {
            return NextResponse.json({ message: 'User with this Email already exists' });
        }

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
        return NextResponse.json({ message: 'not sent', error })
    }
}