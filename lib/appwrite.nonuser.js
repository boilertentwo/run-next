'use server'
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID); // Your project ID

const databases = new Databases(client);

export const unknownPost = async(data)=>{
    try {
        const r = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_ORDERBASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID,
            ID.unique(),
            data
        )
        return r
    } catch (error) {
        throw error
    }
}

;


