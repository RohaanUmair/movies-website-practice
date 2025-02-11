import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accName, selectedAvatar } = await req.json();

        await User.findOneAndUpdate(
            { email },
            { $addToSet: { accNames: accName } },
            { new: true }
        );

        await User.findOneAndUpdate(
            { email, "avatars.accName": { $ne: accName } },
            { $push: { avatars: { accName, avatar: selectedAvatar } } },
            { new: true }
        );

        const updatedUser = await User.findOne({ email });

        const accAvatars = updatedUser.accNames.map(acc => ({
            accName: acc,
            avatar: updatedUser.avatars?.find(av => av.accName === acc)?.avatar || null
        }));

        const cookie = await cookies();
        cookie.set("user", accName, {
            path: "/",
            maxAge: 3600,
        });

        cookie.set("accAvatars", JSON.stringify(accAvatars), {
            path: "/",
            maxAge: 3600,
        });

        return NextResponse.json({ message: 'accName and avatar saved' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error updating accName and avatar' });
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