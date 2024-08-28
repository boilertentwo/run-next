'use client'
import { formatDistanceToNow, parseISO } from 'date-fns';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CraftOrder from "./CraftingOrder";

import AdminVerifyOrders from "./VerifyOrder";



// RelativeTime component for showing formatted time
export const RelativeTime = ({ date }) => {
  const formattedDate = formatDistanceToNow(parseISO(date), { addSuffix: true });
  return <span>{formattedDate}</span>;
};

export default function ListAdOrders({ orders }) {
  const router = useRouter();
  
  

  
  const verifyOrders = orders
    .filter(order => !order.verified)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));


  const craftOrders = orders
    .filter(order => order.verified && !order.crafted)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));
 
 
    const deliverOrders = orders
    .filter(order => order.crafted && !order.delievered)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));
 
 
    const paidOrders = orders
    .filter(order => order.paid)
    .sort((a, b) => new Date(b.orderedat) - new Date(a.orderedat));


    
  return (
    <Tabs defaultValue="verify">
      <TabsList className="grid w-full grid-cols-4 w-full md:w-[450px]">
        <TabsTrigger value="verify">Verify({verifyOrders.length})</TabsTrigger>
        <TabsTrigger value="craft">Craft({craftOrders.length})</TabsTrigger>
        <TabsTrigger value="deliver">Deliver({deliverOrders.length})</TabsTrigger>
        <TabsTrigger value="paid">Paid({paidOrders.length})</TabsTrigger>
      </TabsList>

      <div className="flex flex-wrap justify-center gap-4">
        <TabsContent value="verify" className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {verifyOrders? <AdminVerifyOrders verifyOrders={verifyOrders}/>
          
           : (
            <p className="text-center text-slate-400 w-full">No orders to verify</p>
          )}
        </TabsContent>

        
        <TabsContent value="craft" className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {craftOrders.length > 0?
          (<CraftOrder craftOrders={craftOrders} /> ) 
          : (
            <p className="text-center text-slate-400 w-full">No crafting orders found.</p>
          )}
        </TabsContent>
        <TabsContent value="deliver" className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {deliverOrders.length > 0 ? <span>{deliverOrders.length} orders ready to deliver</span>:<span>No orders for delivery</span>}
        </TabsContent>
        <TabsContent value='paid' className='w-full flex flex-col gap-2 lg:flex-row lg:flex-wrap'>
          {paidOrders.length>0?<span>{paidOrders.length} paid orders</span>:<span>No paid orders yet</span>}
        </TabsContent>
      </div>
    </Tabs>
  );
}
