import { NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/appwrite.config";

export async function middleware(request) {
    const url = request.nextUrl;

    const user = await getLoggedInUser();
    const isLoggedIn = Boolean(user);

    if (isLoggedIn && url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', url));
    }

    if (!isLoggedIn && !url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', url));
    }

    NextResponse.next();
    
}


export const config = {
    matcher: ['/model','/orders','/notification' ,'/login'],
};
