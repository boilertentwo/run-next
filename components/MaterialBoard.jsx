'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MaterialsSection() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className="w-full h-48 flex flex-col justify-around gap-3">
      <span className="text-center text-xl font-light bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent">
        We craft on
      </span>
      <div className="w-full flex flex-row justify-between items-center overflow-x-auto text-black font-bold scrollbar-hide space-x-4 px-4">
        {/* Material Boxes */}
        <div className="min-w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-rose-600 to-white">
          <span>MDF</span>
        </div>
        <div className="min-w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-amber-400 to-white">
          <span>WPC</span>
        </div>
        <div className="min-w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-yellow-700 to-white">
          <span>WOOD</span>
        </div>
        <div className="min-w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gradient-to-r from-emerald-400 to-emerald-200">
          <span>ACRYLIC</span>
        </div>
        <div className="min-w-36 h-36 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center opacity-75 bg-gray-300 text-gray-500">
          <span className="text-center">MS (upcoming)</span>
          
        </div>
      </div>
    </div>
  );
}
