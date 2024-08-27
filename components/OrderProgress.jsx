'use client'

import { useState, useEffect } from 'react';
import CircleLoad from './Circleloader';
import { CircleCheck } from 'lucide-react';

export default function OrderProgress({ verified, crafted, delivered }) {
  const [progressClass, setProgressClass] = useState('');

  useEffect(() => {
    if (!verified) {
      setProgressClass('progress-none');
    } else if (verified && !crafted) {
      setProgressClass('progress-verified');
    } else if (crafted && !delivered) {
      setProgressClass('progress-crafting');
    } else if (delivered) {
      setProgressClass('progress-full');
    }
  }, [verified, crafted, delivered]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`bg-blue-500 h-2 rounded-full ${progressClass}`} />
      <div className="flex justify-between mt-2 text-sm">
        {/* Verified State */}
        <div className="text-gray-600">
          {!verified ? (
             <>
             <div className='flex'>
             <span className='animate-loading'>
                  Verifying
             </span>
             {/* <CircleLoad /> */}
             </div>
         </>
         
            
          ) : (
            <>
              <div className='flex justify-between items-center gap-1'>
              <span className='text-emerald-500 '>Verified</span>
              <CircleCheck className='size-5 stroke-emerald-500'/>
              </div>
              
            </>
          )}
        </div>

        {/* Crafted State */}
        <div className="text-gray-600">
          {verified && !crafted ? (
             <>
             <div className='flex'>
             <span className='animate-loading'>
                  crafting
             </span>
             {/* <CircleLoad /> */}
             </div>
         </>
         
          ) : crafted ? (
            <>
              <div className='flex items-center gap-1'>
              <span className='text-emerald-500 '>Crafted</span>
              <CircleCheck className='size-5 stroke-emerald-500'/>
              </div>
              
            </>
          ) : null}
        </div>

        {/* Delivered State */}
        <div className="text-gray-600">
          {crafted && !delivered ? (
            <>
                <div className='flex'>
                <span className='animate-loading'>
                     Delivering
                </span>
                {/* <CircleLoad /> */}
                </div>
            </>
            
          ) : delivered ? (
            <>
              <div className='flex items-center gap-1'>
              <span className='text-emerald-500 '>Delivered</span>
              <CircleCheck className='size-5 stroke-emerald-500'/>
              </div>
              
            </>
            
          ) : null}
        </div>
      </div>
    </div>
  );
}