import { connectToDb } from "@/lib/mongoDb";
import WatchlistedMovie from "@/models/WatchlistMovie";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accType, watchlistedMoviesArr } = await req.json();
        console.log(watchlistedMoviesArr)

        if (watchlistedMoviesArr.length == 0) return NextResponse.json({ message: 'not updated' })

        const updatedDoc = await WatchlistedMovie.findOneAndUpdate(
            { email, accType },
            { watchlistedMoviesArr },
            { new: true, upsert: true }
        )
        console.log('updated', updatedDoc)

        return NextResponse.json({ message: 'Movie Added' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error watchlisting movie' });
    }
}


export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const email = req.nextUrl.searchParams.get('email');
        const accType = req.nextUrl.searchParams.get('accType');
        const watchlistedMovies = await WatchlistedMovie.findOne({ email, accType });

        return NextResponse.json({ data: watchlistedMovies });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}