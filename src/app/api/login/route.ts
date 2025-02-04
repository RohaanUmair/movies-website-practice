import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

        return NextResponse.json({ message: 'Logged In' });
    } catch (error) {
        return NextResponse.json({ message: 'Error Logging In' })
    }
}