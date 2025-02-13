import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function GET() {
    return NextResponse.json({ message: 'API Working' });
}

export async function POST(request: NextRequest) {
    try {
        await connectToDb();

        const { email, password } = await request.json();

        const userExistence = await User.findOne({ email });

        if (!userExistence) {
            return NextResponse.json({ error: 'Invalid Email' }, { status: 401 });
        }

        const checkPass = await bcrypt.compare(password, String(userExistence.password));

        if (!checkPass) {
            return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
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

        cookie.set('accNames', JSON.stringify(userExistence.accNames), {
            path: '/',
            maxAge: 3600
        });


        const accAvatars = userExistence.accNames.map(accName => ({
            accName,
            avatar: userExistence.avatars?.find(av => av.accName === accName)?.avatar || null
        }));

        cookie.set('accAvatars', JSON.stringify(accAvatars), {
            path: '/',
            maxAge: 3600
        });
        

        return NextResponse.json({ message: 'Logged In' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error Logging In' });
    }
}
