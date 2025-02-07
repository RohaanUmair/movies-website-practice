import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require ('bcrypt');


export async function POST(request: NextRequest) {
    try {
        await connectToDb();

        const { username, email, password } = await request.json();

        const userExistence = await User.findOne({ email });

        if (userExistence) {
            return NextResponse.json({ message: 'User with this Email already exists' });
        }

        // const hashedPassword: string = bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password
            // password: hashedPassword
        });
        await newUser.save();

        return NextResponse.json({ message: 'User Account Created' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error Creating Account' })
    }
}