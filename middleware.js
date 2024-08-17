import { NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/appwrite.config";
import { cookier } from "./app/test";

export async function middleware(request) {
    const url = request.nextUrl;

    const isLoggedIn = cookier()
    

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
