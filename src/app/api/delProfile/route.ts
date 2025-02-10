import { connectToDb } from "@/lib/mongoDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accName } = await req.json();

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $pull: { accNames: accName } },
            { new: true }
        );

        return NextResponse.json({ message: 'accName Deleted', data: updatedUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error deleteing accName' });
    }
}   