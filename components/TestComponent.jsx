'use client'
import { useAuthStore } from "@/lib/zustand/store"



export default function Tester(){
    const user = useAuthStore((state)=>state.user)
    const isLoggedIn = useAuthStore((state)=>state.isAuthenticated)
    return(
        <>
            <h1> {isLoggedIn} bears are around ....</h1>
        </>
    )
}