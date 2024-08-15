'use client'
import Link from "next/link";
import Progresser from "./Loader";
import Negativehold from "./Negaviteholder";

function Flagstatus(){
    
    return(
        <>
            <div className="h-6 w-full text-slate-700 active:text-white text-center underline bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500">
                <Link href={'/login'}>
                        <span >Please login to access services.</span>
                </Link>
                
            </div>
        </>
    )
}

export const EmptyBar = ()=>{
    return(
        <></>
    )
}

export default function Statusbar(){
    
    
         
    return(
        <>
            <Negativehold loader={Progresser} negative={Flagstatus}>
               <EmptyBar/>
            </Negativehold>
            
        </>
    )
}