'use server'

import {v2 as cloudinary} from 'cloudinary'
import crypto from 'crypto'

cloudinary.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})


export const uploadUserImage = async (fileBuffer) => {
    const imit = crypto.randomBytes(6).toString('hex');
    const buffer = Buffer.from(new Uint8Array(fileBuffer))
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            public_id: imit,
            tags: 'next-upload',
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        ).end(buffer);
      });
  
      return imit
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Optionally re-throw the error to be handled upstream
    }
  };


export const getCloudImages= async(folder)=>{
  try {
    const resources = await cloudinary.search.expression(folder).sort_by('public_id','asc').max_results(7).execute()
    return resources.resources
  } catch (error) {
    console.log(error)
    throw error
  }
}