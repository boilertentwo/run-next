import { NextResponse } from "next/server";
import { getLoggedInUser, gettingAdmin } from "./lib/appwrite.config";



export async function middleware(request) {
    const url = request.nextUrl;
    let isLoggedIn;
    let isAdmin;

    try {
        isLoggedIn = await getLoggedInUser();
        
    } catch (error) {
        console.error("An error occurred while checking the user status:", error);
        return NextResponse.redirect(new URL('/error', url));
    }
    if(isLoggedIn){
        try {
            isAdmin = await gettingAdmin()
        } catch (error) {
            console.error("An error occured while checking the admin status:",error)
            return isAdmin = false
        }
    }
    

    if (isLoggedIn && url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', url));
    }

    if (!isLoggedIn && !url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', url));
    }
    if(!isAdmin && url.pathname.startsWith('/admin')){
        return NextResponse.redirect(new URL('/error', url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/model','/orders','/notification' ,'/login','/admin'],
    
};
