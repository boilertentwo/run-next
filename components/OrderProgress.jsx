'use client'

import { useState, useEffect } from 'react';
import CircleLoad from './Circleloader';

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
             <span>
                  Verifying
             </span>
             <CircleLoad />
             </div>
         </>
         
            
          ) : (
            <span className='text-emerald-500'>Verified</span>
          )}
        </div>

        {/* Crafted State */}
        <div className="text-gray-600">
          {verified && !crafted ? (
             <>
             <div className='flex'>
             <span>
                  crafting
             </span>
             <CircleLoad />
             </div>
         </>
         
          ) : crafted ? (
            <span className='text-emerald-500'>Crafted</span>
          ) : null}
        </div>

        {/* Delivered State */}
        <div className="text-gray-600">
          {crafted && !delivered ? (
            <>
                <div className='flex'>
                <span>
                     Delivering
                </span>
                <CircleLoad />
                </div>
            </>
            
          ) : delivered ? (
            <span className='text-emerald-500'>Delivered</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}