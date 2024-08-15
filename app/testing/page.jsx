'use client'
import Tester from '@/components/TestComponent'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import crypto from 'crypto'
import { useEffect } from 'react'
import { uploadUserImage } from '@/lib/cloudinary.config'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { CheckCircle, LoaderCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/zustand/store'
import { cookier } from '../test'
import { toast } from 'sonner'



export default function Testing(){
  
  // useEffect(()=>{
  //   cookier().then((result)=>{console.log(result.value)}).catch((error)=>{console.log(error)})
  // },[])
  // async function create(formData){
  //   const file = formData.get('image')
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // const publicId = await uploadUserImage(buffer)
    // console.log(file)

  
  
  return(
    <>
      <Button onClick={()=>{toast('Hello',{description:"Checking whether it's working or not"})}}>Toast</Button>
    </>
  )
}



      {/* <Tester/>
      <form action={create}>
      <Input type='file' id='image' name='image'></Input>
      <Button type='submit'>Create</Button>
      </form> */}
       {/* <AlertDialog >
                            <AlertDialogTrigger asChild><Button type="submit">Post</Button></AlertDialogTrigger>
                        
                            <AlertDialogContent className='h-96 w-72 flex flex-col justify-center rounded-xl'>
                            <AlertDialogHeader className='flex flex-col justify-around items-center gap-5'>
                                <AlertDialogTitle>{loading?<span>Posting...</span>:<span>Posted successfully!</span>}</AlertDialogTitle>
                                <AlertDialogDescription className='flex flex-row justify-center'>{loading?<LoaderCircle className='stroke-sky-400 size-24 animate-spin'/>:<CheckCircle className='stroke-green-500 size-24 animate-check-bounce'></CheckCircle>}</AlertDialogDescription>
                                <Input type='text'></Input>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                
                                <AlertDialogAction className='w-24 left-24'>Submit</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
        </AlertDialog>  */}