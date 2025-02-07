import { connectToDb } from "@/lib/mongoDb";
import LikedMovie from "@/models/LikedMovies";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, likedMoviesArr } = await req.json();
        console.log(likedMoviesArr)

        const updatedDoc = await LikedMovie.findOneAndUpdate(
            { email },
            { likedMoviesArr },
            { new: true, upsert: true }
        )
        console.log('updated', updatedDoc)

        return NextResponse.json({ message: 'Movie Added' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error liking movie' });
    }
}


export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const email = req.nextUrl.searchParams.get('email');
        const likedMovies = await LikedMovie.findOne({ email });

        return NextResponse.json({ data: likedMovies });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}