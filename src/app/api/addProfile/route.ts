import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accName } = await req.json();

        await User.findOneAndUpdate(
            { email },
            { $addToSet: { accNames: accName } },
            { new: true }
        )

        const cookie = await cookies();

        cookie.set("user", accName, {
            path: "/",
            maxAge: 3600,
        });

        return NextResponse.json({ message: 'accName Updated' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error updating accName' });
    }
}   


export async function GET() {
    await connectToDb();

    try {
        const email = (await cookies()).get('userEmail')?.value;
        const accNames = await User.findOne({ email })

        return NextResponse.json({ data: accNames });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}