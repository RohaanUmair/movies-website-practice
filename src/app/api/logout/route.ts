import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cookie = await cookies();

    cookie.delete('user');
    cookie.delete('userEmail');
    cookie.delete('accType');


    return NextResponse.redirect(new URL("/login", request.url));
}