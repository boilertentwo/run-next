import ServeImages from "@/lib/cloudinary.config";

export default function TestRoute(){
    const folder1 = "ms-crafts AND tags=lg"
    const folder2 = "ms-crafts AND tags=medium"
    
    return(
        <>
            <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Borders</span></div>
              <ServeImages folder={folder1}/>
            <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Panels</span></div>   
              <ServeImages folder={folder2}/> 
        </>
    )
}






























