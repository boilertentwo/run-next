'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MaterialsSection() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };
  return (
    <div className="w-full h-fit flex flex-col justify-around gap-3">
      <span className="text-center text-xl font-light bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent">
        We craft 
      </span>
      <div className="w-full flex flex-wrap justify-center lg:justify-between items-center gap-4 lg:overflow-x-auto text-black font-bold scrollbar-hide">
        {/* MDF */}
        <div className="w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-rose-600 to-white">
          <span>MDF</span>
        </div>
        {/* WPC */}
        <div className="w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-amber-400 to-white">
          <span>WPC</span>
        </div>
        {/* WOOD */}
        <div className="w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-yellow-700 to-white">
          <span>WOOD</span>
        </div>
        {/* ACRYLIC */}
        <div className="w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-emerald-400 to-emerald-200">
          <span>ACRYLIC</span>
        </div>
        {/* MS (upcoming) */}
        <div className="relative w-36 h-36 border-2 border-dashed border-amber-500 rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-100 text-gray-700">
          <span className="text-center font-bold">MS</span>
          <span className="absolute w-full text-center top-2 text-xs text-white bg-amber-600 px-2 py-1 rounded-full animate-pulse">
            Coming Soon
          </span>
        </div>
        <div className="relative w-36 h-36 border-2 border-dashed border-amber-500 rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 via-sky-300 to-gray-500 text-gray-700">
          <span className="text-center font-bold">Letters</span>
          <span className="absolute w-full text-center top-2 text-xs text-white bg-amber-600 px-2 py-1 rounded-full animate-pulse">
            Coming Soon
          </span>
        </div>

      </div>
    </div>
  );
  
}
