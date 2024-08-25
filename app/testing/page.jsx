'use client'
import { useState } from 'react';
import ProgressBar from '@/components/testing/Test1.jsx';

export default function Home() {
  const [status, setStatus] = useState('verified');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Order Progress</h1>
      <ProgressBar verified={true} crafted={true} delivered={false} />
      
      <div className="mt-10">
        <button
          onClick={() => setStatus('verified')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Verified
        </button>
        <button
          onClick={() => setStatus('full')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Full Progress
        </button>
      </div>
    </div>
  );
}




// import { getLocale, getLoggedInUser } from "@/lib/appwrite.config";
// import ServeImages from "@/lib/cloudinary.config";
// import { useEffect } from "react";
// import { toast } from "sonner";
// import { cookier } from "../test";
// import Logout from "@/components/Logout";
// import { useAuthStore } from "@/lib/zustand/store";

// export default function TestRoute(){
//     const folder1 = "ms-crafts AND tags=lg"
//     const folder2 = "ms-crafts AND tags=medium"
//     const user = useAuthStore((state)=>state.user)

//     useEffect(()=>{
//       console.log(user)
//     },[])
//     return(
//         <>
//             <Logout/>
//             {/* <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Borders</span></div>
//               <ServeImages folder={folder1}/>
//             <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Panels</span></div>   
//               <ServeImages folder={folder2}/>  */}
//         </>
//     )
// }






























