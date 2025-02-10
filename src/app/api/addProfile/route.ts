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