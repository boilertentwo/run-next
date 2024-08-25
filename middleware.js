import { NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/appwrite.config";


export async function middleware(request) {
    const url = request.nextUrl;
    let isLoggedIn;

    try {
        isLoggedIn = await getLoggedInUser();
        
    } catch (error) {
        console.error("An error occurred while checking the user status:", error);
        return NextResponse.redirect(new URL('/error', url));
    }

    if (isLoggedIn && url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', url));
    }

    if (!isLoggedIn && !url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/model','/orders','/notification' ,'/login'],
    
};
