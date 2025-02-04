import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDb();

        const { username, email, password } = await request.json();

        const userExistence = await User.findOne({ email });

        if (userExistence) {
            return NextResponse.json({ error: 'User with this Email already exists' });
        }

        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();

        return NextResponse.json({ message: 'User Account Created' });
    } catch (error) {
        return NextResponse.json({ message: 'Error Creating Account' })
    }
}