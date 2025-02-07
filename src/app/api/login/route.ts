import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({ message: 'API Working' });
}

export async function POST(request: NextRequest) {
    try {
        await connectToDb();

        const { email, password } = await request.json();

        const userExistence = await User.findOne({ email });

        if (!userExistence) {
            return NextResponse.json({ error: 'Invalid Email' });
        }

        if (userExistence.password !== password) {
            return NextResponse.json({ error: 'Invalid Credentials' });
        }

        const cookie = await cookies();

        cookie.set("user", userExistence.username, {
            path: "/",
            maxAge: 3600,
        });

        cookie.set("userEmail", userExistence.email, {
            path: '/',
            maxAge: 3600
        });

        return NextResponse.json({ message: 'Logged In' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error Logging In' })
    }
}