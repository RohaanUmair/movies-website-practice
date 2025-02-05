import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
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
            subject: "Reset Passsword OTP",
            text,
            html: `<p>Your OTP is: <b>${text}</b></p>`,
        }).then(() => console.log('Email sent'))

        return NextResponse.json({ message: 'Email Sent' })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}


export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, password } = await req.json();

        await User.findOneAndUpdate(
            { email },
            { password },
            { new: true }
        )

        return NextResponse.json({ message: 'Password Updated' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating password' });
    }
}