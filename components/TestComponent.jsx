// Client Component
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { Skeleton } from '@/components/ui/skeleton'; // Import your skeleton component if needed

export default function ClientImageGallery({ images }) {
  const router = useRouter();
  return (
    <>
    <div className="relative h-auto w-full flex flex-row justify-around  items-start p-2 scroll-smooth snap-mandatory snap-x overflow-x-auto gap-6">
      {
        images.map((obj, index) => (
          <CldImage
            key={index}
            src={obj.public_id}
            width="75"
            height="75"
            alt={`Image ${index + 1}`}
            className="snap-center snap-always scroll-smooth z-40"
            onClick={() => router.push(`/model/${obj.public_id}`)}
          />
        ))
      }
    
    </div>
    </>
   
  );
}