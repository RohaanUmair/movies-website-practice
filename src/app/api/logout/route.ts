import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookie = await cookies();

    cookie.delete('user');
    cookie.delete('userEmail');
    cookie.delete('accType');


    return NextResponse.json({ message: 'Logged out' })
}