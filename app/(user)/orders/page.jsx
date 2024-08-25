'use client'


import UserOrders from "@/components/UserOrders";
import { ListOrders } from "@/lib/appwrite.config";
import {useState, useEffect} from 'react'
import { toast } from "sonner";
export default function OrderPage(){
    const [orders,setOrders] = useState([])
    useEffect(()=>{
        ListOrders().then((result)=>setOrders(result)).catch((error)=>toast('try again',{description:'Check internet connection'}))
    },[])
    return(
        <>
            <main className="flex flex-col flex-wrap justify-between gap-4 p-4">
                    <UserOrders orders={orders}/>
            </main>
        </>
    )
}