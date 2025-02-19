import { connectToDb } from "@/lib/mongoDb";
import LikedMovie from "@/models/LikedMovies";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accName, newAccName, selectedAvatar } = await req.json();

        const updatedUser = await User.findOneAndUpdate(
            { email, 'accNames': accName },
            { $set: { 'accNames.$': newAccName } },
            { new: true }
        );

        const existingAvatar = await User.findOne({
            email,
            avatars: { $elemMatch: { accName } }
        });

        if (existingAvatar) {
            await User.findOneAndUpdate(
                { email, 'avatars.accName': accName },
                { $set: { 'avatars.$.accName': newAccName, 'avatars.$.avatar': selectedAvatar } },
                { new: true }
            );
        } else {
            await User.findOneAndUpdate(
                { email },
                { $push: { avatars: { accName: newAccName, avatar: selectedAvatar } } },
                { new: true }
            );
        }

        await LikedMovie.findOneAndUpdate(
            { email, accType: accName },
            { accType: newAccName },
            { new: true }
        );


        const updatedUserData = await User.findOne({ email });
        
        const accAvatars = updatedUserData.accNames.map(acc => ({
            accName: acc,
            avatar: updatedUserData.avatars?.find(av => av.accName === acc)?.avatar || null
        }));

        const cookie = await cookies();
        cookie.set('accAvatars', JSON.stringify(accAvatars), {
            path: '/',
            maxAge: 3600
        });


        return NextResponse.json({ message: 'accName Updated', data: updatedUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error deleteing accName' });
    }
}   