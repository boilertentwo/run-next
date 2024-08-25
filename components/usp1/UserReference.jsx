'use client';
import { cookier } from '@/app/test';
import { useForm } from 'react-hook-form';
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from '@/lib/zustand/store';
import { Label } from '../ui/label';
import { LoaderCircle, CheckCircle, ImageUp, Milestone, Ruler, CircleX, Cross, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { uploadUserImage } from '@/lib/cloudinary.config';
import CircleLoad from '../Circleloader';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogAction } from '../ui/alert-dialog';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import Negativehold from '../Negaviteholder';
import { PositiveHold } from '../PositiveHolder';
import { makePost } from '@/lib/appwrite.config';
import { unknownPost } from '@/lib/appwrite.nonuser';
import { toast } from 'sonner';

const UserContact = ({ register, errors }) => {
    return (
        <>
            <Input
                type='text'
                placeholder='Your Email or WhatsApp'
                className={`${errors.contactInfo ? 'border-red-500' : 'border-gray-300'}`}
                {...register('contactInfo', { required: 'Contact information is required' })}
            />
            
        </>
    );
};

const UserMessage = ({register}) => {
    return(
        <>
            <Input 
                type='text'
                className='h-16'
                placeholder='Message(optional)'
                {...register('usermessage')}
            />
        </>
    )
}

const makeToast = ({title,description}) => {
    toast(title,{description:description})
}

export function UserReference() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const isLoggedIn = useAuthStore((state)=>state.isAuthenticated);
    const LogOut = useAuthStore((state)=>state.logOut)
    const loggingOut = () => {
        LogOut()
        useAuthStore.persist.clearStorage()
        toast("You're Logged out!",{description:"Login to get follow back on orders"})
    }
    const [userId, setUserId] = useState()
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false); // State to track form errors
    const [contact, setContact] = useState(null)
    const [orderObject, setOrderObj] = useState({})
    useEffect(()=>{
         
        if(isLoggedIn){
            cookier()
            .then((result)=>{setUserId(result.value)})
            .catch((error)=>{
                return null})
        }
         if (Object.keys(errors).length > 0) {
            setHasError(true); // Set error state if form has validation errors
            return;
        }
        
    },[errors, isLoggedIn])
   
    const onSubmit = async(data) => {
       

        setLoading(true);
        setHasError(false); // Reset error state on valid form submission

        const queryHeight = parseFloat(data.height);
        const queryWidth =  parseFloat(data.width) ;
        const queryImage = data.image[0]; // Get the first file from the FileList
        if (queryImage) {
            const arrayBuffer = await queryImage.arrayBuffer(); // Convert the file to ArrayBuffer
            const buffer = new Uint8Array(arrayBuffer);
            const publicId = await uploadUserImage(buffer).then((result)=>{return result}).catch((error)=>{toast('Error occured',{description:'Keep image size within 10mb'})});
            
            if(!isLoggedIn){
                const orderObj = { imageId: publicId, height: queryHeight, width: queryWidth };
                setOrderObj(orderObj)
            }
            else{
                const orderObj = { imageId: publicId, height: queryHeight, width: queryWidth,contactUserAt: userId, loggedUser: true };
                makePost(orderObj).then((result)=>{toast("You post reached us",{description:"We'll reach out to you in 24 hours"})}).catch((error)=>{toast('Please try again!',{description:'While posting error occured'})})
                reset();
            }
        } else {
            console.log("image hasn't uploaded")
        }
        
       
        setLoading(false);
    }
    const submitContact = () =>{
        const nonUserOrder = {...orderObject,contactUserAt:contact,loggedUser:false}
        unknownPost(nonUserOrder).then((result)=>{toast("We'll contact you with quotation",{description:'Consider Logging in for better services.'})}).catch((error)=>{toast('Try again.',{description:'Error while posting.'})}).finally(reset())
        
    }


    return (
        <>
            <Card className='h-full w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl text-amber-400 flex flex-row items-center gap-2'>
                        Post us
                    </CardTitle>
                    {/* <CardDescription>
                        Have a design in mind?
                    </CardDescription> */}
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="relative flex flex-col gap-4 mb-3">
                            <Label htmlFor='image' className='text-md flex flex-row items-center gap-2'>1. Upload</Label>
                            <Input
                                type="file"
                                id="image"
                                aria-label="Image"
                                className={`${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('image', {
                                    required: 'Image is required',
                                    validate: {
                                        fileType: (value) => value[0]?.type.startsWith('image/') || 'Only image files are allowed',
                                    }
                                })}
                            />
                        </div>
                        <Label className='text-md flex flex-row items-center gap-2'>2. Measurements</Label>
                        <div className="relative flex items-center space-x-2">
                            <Input 
                                type='number' 
                                placeholder='Inch' 
                                aria-label="Height"
                                min='0'
                                step='any'
                                className={`${errors.height ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('height', { required: 'Height is required' })}
                            />
                            <span className="text-lg">×</span>
                            <Input 
                                type='number' 
                                placeholder='Inch' 
                                aria-label="Width" 
                                min='0'
                                step='any'
                                className={`${errors.width ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('width', { required: 'Width is required' })}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="submit">Post</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='h-96 w-72 flex flex-col justify-center rounded-xl'>
                                <AlertDialogHeader className='flex flex-col justify-around items-center gap-5'>
                                    {isLoggedIn?<AlertDialogCancel className='w-full flex flex-row justify-end'><X/></AlertDialogCancel>:null}
                                    <AlertDialogTitle>{loading ? <span>Posting...</span> : <span>{hasError ? 'Please fill the form first!' : 'Posted successfully!'}</span>}</AlertDialogTitle>
                                    <AlertDialogDescription className='flex flex-row justify-center'>
                                        {loading ? (
                                            <LoaderCircle className='stroke-sky-400 size-24 animate-spin' />
                                        ) : (
                                            hasError ? <CircleX className='stroke-red-400 size-24 animate-vibrate'/> : <CheckCircle className='stroke-green-500 size-24 animate-check-bounce' />
                                        )}
                                    </AlertDialogDescription>
                                    {isLoggedIn && !hasError ? (
                                        <span>We will notify you in a moment</span>
                                    ) : (
                                        hasError ? null : <><PositiveHold loader={CircleLoad} positive={null}><Label htmlFor='contact'>How to send the quotation?</Label><Input type='text' id='contact' placeholder='Email Id or WhatsApp no.' onChange={(e)=>{setContact(e.target.value)}}/></PositiveHold></> 
                                    )}
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {loading?null:hasError?(<AlertDialogCancel variant='outline'>Okay</AlertDialogCancel>):!isLoggedIn?<AlertDialogAction disabled={!contact} onClick={submitContact} className='w-24 left-24'>Submit</AlertDialogAction>:null}
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog> 
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}

