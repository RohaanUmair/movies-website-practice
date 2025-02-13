import { connectToDb } from "@/lib/mongoDb";
import DislikedMovie from "@/models/DislikedMovies";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectToDb();

    try {
        const { email, accType, dislikedMoviesArr } = await req.json();
        console.log(dislikedMoviesArr)

        if (dislikedMoviesArr.length == 0) return NextResponse.json({ message: 'not updated' })

        const updatedDoc = await DislikedMovie.findOneAndUpdate(
            { email, accType },
            { dislikedMoviesArr },
            { new: true, upsert: true }
        )
        console.log('updated', updatedDoc)

        return NextResponse.json({ message: 'Movie Added' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error disliking movie' });
    }
}


export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const email = req.nextUrl.searchParams.get('email');
        const accType = req.nextUrl.searchParams.get('accType');
        const dislikedMovies = await DislikedMovie.findOne({ email, accType });

        return NextResponse.json({ data: dislikedMovies });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}