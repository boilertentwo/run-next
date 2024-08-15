'use client'

import { Card, CardTitle } from "./ui/card"

export default function DisplayCard(props){
    return(
        <>
            <div className="h-full w-full  bg-[url('/1.jpg')] bg-cover bg-center p-10">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ">
                LOOKING FOR <br/> CNC SERVICES?
                </span>
                

            </div>
        </>
    )
}
