'use client'

import { getLocale, getLoggedInUser } from "@/lib/appwrite.config";
import ServeImages from "@/lib/cloudinary.config";
import { useEffect } from "react";
import { toast } from "sonner";
import { cookier } from "../test";
import Logout from "@/components/Logout";

export default function TestRoute(){
    const folder1 = "ms-crafts AND tags=lg"
    const folder2 = "ms-crafts AND tags=medium"
    useEffect(()=>{
      getLoggedInUser().then((result)=>console.log(result)).catch((error)=>console.log(error))
    },[])
    return(
        <>
            <Logout/>
            {/* <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Borders</span></div>
              <ServeImages folder={folder1}/>
            <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Panels</span></div>   
              <ServeImages folder={folder2}/>  */}
        </>
    )
}






























