'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { CardDescription, CardTitle, Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { logSession, phoneToken } from "@/lib/appwrite.config";
import { useRouter } from "next/navigation";
import { LoaderCircle, MessageSquareCode, Smartphone } from "lucide-react";
import { useAuthStore } from "@/lib/zustand/store";
import { toast } from "sonner";

export default function LoginCard(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [userId, setUserId] = useState()
    const IN = '+91'
    const router = useRouter()
  const [disable, setDisable] = useState(true)
  const [pin, setPin]= useState([])
  const [loading, setLoading] = useState(false)
  const setUser = useAuthStore((state)=>state.logIn)

  const onChange = (pin) => {
    setPin(pin)
    if(pin.length>5){
      setDisable(false)
    }
    else{
      setDisable(true)
    }
  }

  const Login = async() => {
    setLoading(true)
    try {
      const userString = await logSession(userId,pin)
      const user = JSON.parse(userString)
      
     
        setUser(user)
        toast("Welcome to orderBook",{description:"Now fully access our features and services."})
        setLoading(false)
        router.push('/')
     
      
      
    } catch (error) {
      toast('Try again',{description:"Error occured while logging user in."})
      setLoading(false)
    }
    
     
  } 

  const onSubmit = async(data) => {
    setLoading(true)
    const mobile = IN + data.contact
    try {
      const userID= await phoneToken(mobile)
      setUserId(userID)
      setLoading(false)
    } catch (error) {
      toast('Error occured',{description:"Check internet connection and try again"})
      setLoading(false)
    }
    
    
    // sendOtp(user)
    // .then((result)=>
    //                 {const userID = result
    //                   setUserId(userID)
    //                   console.log(userID) 
    //               })
    // .catch((error)=>{console.log(error)})
  }
    return(
        <>
            <Card className='h-84 max-w-80'>
                <CardHeader>
                <CardTitle className='text-2xl font-bold flex flex-row items-center gap-2'>
                    Login through OTP
                </CardTitle>
                <CardDescription>
                    Enjoy full access to our services.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="min-h-48 flex flex-col justify-between gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <Label className={`flex flex-row items-center gap-2 ${userId ? 'text-slate-600' : ''}`} htmlFor='contact'><Smartphone/> Mobile Number</Label>    
                    <Input
                        disabled={userId}
                        type='number'
                        id='contact'
                        placeholder='10-digit'
                        {...register('contact',{required: true, minLength:10, maxLength:10})}
                    />
                    {errors.contact&&<span className="text-red-400">Please enter a 10-digit number</span>}
                    <Label 
                        className={`flex flex-row gap-2 items-center ${!userId ? 'text-slate-600' : ''}`} 
                        htmlFor='otp'
                      >
                        <MessageSquareCode />
                        <span>Verify OTP</span>
                      </Label>
                       <InputOTP
                        disabled={!userId}
                        maxLength={6}
                        value={pin}
                        id='otp'
                
                        onChange={onChange}
                        >
                            <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button className={!userId?'hidden':''} disabled={disable} type='button' onClick={Login}>{loading?<LoaderCircle className="animate-spin"/>:<span>Verify</span>}</Button>
                        <Button className={userId?'hidden':''} type='submit'>{loading?<LoaderCircle className="animate-spin"/>:<span>Submit</span>}</Button>
                    </form>
                    
                </CardContent>
                
            </Card>
        </>
    )
}


// 'use client'

// import { Input } from "@/components/ui/input"
// import { useForm } from "react-hook-form"
// import { useAuth } from "@/context/authContext"
// import { useEffect } from "react"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
// import { Button } from "./ui/button"

// export function LoginCard(){
//     const {register,handleSubmit,formState:{errors}} = useForm()
//     const IN = '+91'
//     const {setUserId} = useAuth()
   

//     const onSubmit = (data) => {
//         const userContact = IN + data.contactInfo;
//         console.log(userContact)
//         setUserId('done')
//     }

//     return(
//         <>
//             <Card className='p-2 m-2 max-w-md text-lg gap-2 flex flex-col justify-around shadow-lg rounded-lg border border-gray-700  text-gray-100'>
//                 <CardHeader>
//                     <CardTitle className="text-left text-2xl font-bold text-gray-100">
//                         Login through OTP
//                     </CardTitle>
//                     <CardDescription className="text-left text-gray-400">
//                         Verify your phone number below.
//                     </CardDescription>
//                 </CardHeader>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <CardContent className="flex flex-col gap-2">
//                         <Input 
//                             type='number' 
//                             id='contactInfo' 
//                             placeholder='Enter your phone number' 
//                             minLength={10}
//                             maxLength={10}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
//                             {...register('contactInfo', {
//                                 required: true,
//                                 minLength: 10,
//                                 maxLength: 10,
//                             })}
//                         />
//                         {errors.contactInfo && <p className="text-sm text-red-500">Please enter a valid 10-digit number</p>}
//                     </CardContent>
//                     <CardFooter className="flex justify-center">
//                         <Button type='submit' className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
//                             Submit
//                         </Button>
//                     </CardFooter>
//                 </form>
//             </Card>
//         </>
//     )
// }
