'use server'
import { createSessionClient } from "@/lib/appwrite.config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export const cookier = ()=>{
    
    const user = cookies().get('oB-user')
    
    return user
}

export async function clearSession() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession('current');
        cookies().delete('orderBook-secret');
        cookies().delete('oB-user');
    } catch (error) {
        throw error;
    }
}



export const sendOtp = async(contact)=>{
    try {
        const token = await account.createPhoneToken(ID.unique(),contact)
        const user = token.userId
        return user     
    } catch (error) {
        console.log('generate account error: '+ error)
    }
}

export const loggingIn = async(userId,OTP)=>{
    try {
        const user = await account.createSession(userId,OTP)   
        return user
    } catch (error) {
        console.log('Login error: '+ error)
    }
}


export const isLoggedIn = async () => {
    try {  
      const user = await account.get();
      return !!user // Convert user to boolean (true if user exists, false otherwise)
    } catch (error) {
      console.log('Error at isLoggedIn:', error);
      return false // Return false if there's an error
    }
  };


