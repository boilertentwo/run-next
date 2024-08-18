'use server'
import {Client, Account, Users, ID} from 'node-appwrite'
import { cookies } from 'next/headers'

import { Databases } from 'appwrite'



export async function createSessionClient(){
    const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
                                  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID)
    const session = cookies().get('orderBook-secret')
    if(!session||!session.value){
        throw new Error('no session');
    }
    else{
        client.setSession(session.value)
    }
    return {
        get account(){
            return new Account(client)
        },get user(){
            return new Users(client)
        },
        get database(){
            return new Databases(client)
        }
    }
}

export async function createAdminClient(){
    const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
                                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID)
                                .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
    return{
        get account(){
            return new Account(client)
        }
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        await account.get();
        return true; // If account.get() is executed successfully, return true
    } catch (error) {
        
        if (error.cause && error.cause.code === 'ENOTFOUND') {
            throw new Error('Network issue: Unable to resolve server. Please check your connection.');
        }
        if(error.message && error.message==='no session'){
            console.log(error)
            return false;
        }
        
    }
}



export async function phoneToken(mobile) {
    try {
        const { account } = await createAdminClient();
        const result = await account.createPhoneToken(ID.unique(), mobile);
        return result.userId;
    } catch (error) {
        console.error('Error at phone token:', error);
        throw error; 
    }
}

export async function logSession(userId,OTP){
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(userId, OTP)
        const month = 30*24*60*60;
        cookies().set('oB-user',session.userId,{
            path:'/',
            httpOnly: true,
            sameSite:'strict',
            secure: true,
            expires: Date.now()+month,
            maxAge: month,
        })
        cookies().set('orderBook-secret',session.secret ,{
            path:'/',
            httpOnly:true,
            sameSite:'strict',
            secure:true,
            expires: Date.now()+month,
            maxAge: month,
        })
        return JSON.stringify(session)
    } catch (error) {
        console.log('error creating a session',error)
    }
}

export async function getUser(userId){
    
    const {user} = await createAdminClient();

    try {
        const response = user.get(userId)
        return JSON.stringify(response)
        
    } catch (error) {
        console.log('error at get user:',error)
    }
}

export const makeOrder = async(order)=>{
    const {database} = await createSessionClient()
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_ORDERBASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
            ID.unique(),
            order
        )
        return response
    } catch (error) {
        console.log(error)
    }
}