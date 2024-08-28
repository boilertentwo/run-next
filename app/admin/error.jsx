'use client'

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function AdminError(){
    <>
        <main className="w-full h-screen flex justify-center items-center gap-4">
                <strong>Oops!! </strong>
                
                <span>Error occured</span>
                <Button onClick={()=>redirect('/')}>Go to Home</Button>
        </main>
    </>
}