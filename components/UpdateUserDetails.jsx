'use client'

import { useAuthStore } from "@/lib/zustand/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { updateName } from "@/lib/appwrite.config";

export function UpdateDetails(){
    const user = useAuthStore((state)=>state.user)
    const setUser = useAuthStore((state)=>state.logIn)
  
    const {register, handleSubmit, formState: {errors}} = useForm()
    const onSubmit = async (data) => {
        try {
            const username = data.username
            const result = await updateName(username)
            const user = JSON.parse(result)
            console.log(user)
            setUser(user)
        } catch (error) {
            console.log(error) 
        }
    }
    return(
        <>
            <Card className="max-w-md mx-auto mt-6 shadow-lg rounded-lg border border-gray-200">
                <CardHeader className="p-5 bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            Register with a name.
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Help us know you.
                        </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        <CardContent className="space-y-4">
                            <Input 
                                type='text' 
                                id='username'
                                placeholder='Enter name'
                                {...register('username',{required: true})}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.username && <p className="text-red-700 text-sm">Please provide a name.</p>}
                        </CardContent>
                        <CardFooter className="flex justify-end pt-4">
                            <Button type='submit' className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Submit
                            </Button>
                        </CardFooter>
                </form>
            </Card>
        </>
    )
}
