'use client'
import { CldImage } from "next-cloudinary"

export default function ImageForm({params}){
    return(
        <>
            <div className="min-h-full min-w-full p-6 flex flex-col items-center">
                 <CldImage alt="crafted image" src={`${params.modelID}/${params.itemID}`} width='100' height='100'/>
            </div>
        </>
    )
}