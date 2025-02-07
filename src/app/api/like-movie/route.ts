import { connectToDb } from "@/lib/mongoDb";
import LikedMovie from "@/models/LikedMovies";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accType, likedMoviesArr } = await req.json();
        console.log(likedMoviesArr)

        if (likedMoviesArr.length == 0) return NextResponse.json({ message: 'not updated' })

        const updatedDoc = await LikedMovie.findOneAndUpdate(
            { email, accType },
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
        const accType = req.nextUrl.searchParams.get('accType');
        const likedMovies = await LikedMovie.findOne({ email, accType });

        return NextResponse.json({ data: likedMovies });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}