'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/authContext"
import { Card, CardDescription, CardContent ,CardHeader, CardTitle, CardFooter } from "./ui/card"
import { Button } from "./ui/button"

export function VerifyOtp(){
  const [disable, setDisable] = useState(true)
  const [pin, setPin]= useState([])
  const {userId}=useAuth()
  useEffect(()=>{
    console.log(userId)
  },[userId])
 
  const onChange = (pin) => {
    setPin(pin)
    if(pin.length>5){
      setDisable(false)
    }
    else{
      setDisable(true)
    }
  }
  const handleSubmit = () => {
    console.log(pin)
  }
  return(
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Verify OTP 
          </CardTitle>
          <CardDescription>
            Enter the OTP we've sent to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
          maxLength={6}
          value={pin}
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
        </CardContent>
        <CardFooter>
          <Button disabled={disable} onClick={handleSubmit}>Verify</Button>
        </CardFooter>
      </Card>
    </>
  )
}