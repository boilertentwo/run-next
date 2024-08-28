'use server'
import ListAdOrders from "@/components/ListAdmin"
import { createSessionClient, createAdminClient } from "@/lib/appwrite.config"
import Link from "next/link"

export default async function GetUserDocums () {
    const {database} = await createSessionClient()
    try {
        const result = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_ORDERBASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
        )
        return <ListAdOrders orders={result.documents}/>
    } catch (error) {
        throw error
    }
}

export const deleteUserDocument = async(documentId)=>{
    const {database} = await createSessionClient()
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_ORDERBASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
            documentId
        )
        return response
    } catch (error) {
        throw error
    }
}

export const updateUserDocument = async(docId, update)=>{
    const {database} = await createSessionClient()
    try {
        const result = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_ORDERBASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
            docId,
            update
        )
        return result

    } catch (error) {
        throw error
    }
}