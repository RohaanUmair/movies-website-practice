import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('user')?.value;

    if (userId) {
        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else if (!userId) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

}

export const config = {
    matcher: ['/login', '/signup', '/']
}