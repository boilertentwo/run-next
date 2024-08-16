// Client Component
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { Skeleton } from '@/components/ui/skeleton'; // Import your skeleton component if needed

export default function ClientImageGallery({ images }) {
  const router = useRouter();
  return (
    <div className="h-auto w-full flex flex-row justify-around items-start p-4 mx-4 scroll-mx-px snap-mandatory snap-x overflow-x-auto gap-4">
      {!images ? (
        <Skeleton className="h-[75px] w-[75px]"></Skeleton> // Adjust size to match your images
      ) : (
        images.map((obj, index) => (
          <CldImage
            key={index}
            src={obj.public_id}
            width="75"
            height="75"
            alt={`Image ${index + 1}`}
            className="snap-start snap-always"
            onClick={() => router.push(`/model/${obj.public_id}`)}
          />
        ))
      )}
    </div>
  );
}