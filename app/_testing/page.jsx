// 'use client';
// import { useState, useMemo } from 'react';
// import { Button } from '@/components/ui/button';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { formatDistanceToNow, format, parseISO, isSameDay } from 'date-fns';
// import { Separator } from '@/components/ui/separator';
// import { useRouter } from 'next/navigation';
// import { RelativeTime } from '@/components/ListAdmin';
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';

// export default function GroupedVerifyOrders({verifyOrders}) {
//   const router = useRouter();

//   // Helper function to group orders by user and date within 24 hours
//   const groupOrders = useMemo(() => {
//     const grouped = {};
//     verifyOrders.forEach((order) => {
//       const userId = order.user;
//       const orderDate = parseISO(order.orderedat);

//       if (!grouped[userId]) {
//         grouped[userId] = [];
//       }

//       // Check if the order can be grouped with an existing order
//       const existingGroup = grouped[userId].find((group) => {
//         return isSameDay(orderDate, parseISO(group[0].orderedat));
//       });

//       if (existingGroup) {
//         existingGroup.push(order);
//       } else {
//         grouped[userId].push([order]); // Create a new group for this user
//       }
//     });
//     return grouped;
//   }, [verifyOrders]);

//   return (
//     <>
//       {Object.keys(groupOrders).map((userId) =>
//         groupOrders[userId].map((orderGroup, groupIndex) => (
//           <div key={`${userId}-${groupIndex}`} className="w-full h-fit sm:w-full md:w-full lg:w-[48%] xl:w-[32%] border-2 border-amber-400 rounded-lg shadow-md lg:flex flex-wrap">
//             <Accordion collapsible className="w-full px-2">
//               <AccordionItem value={`item-${userId}-${groupIndex}`}>
//                 <AccordionTrigger>
//                   <div className="w-full flex justify-between items-center text-slate-400 p-4">
//                     <strong className="text-sm font-medium text-white">User #{userId} Orders</strong>
//                     <RelativeTime date={orderGroup[0].orderedat} />
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   {orderGroup.map((obj, index) => (
//                     <section key={index} className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:flex-wrap lg:gap-y-4 justify-between items-start lg:items-center px-4 py-2 space-y-4 lg:space-y-0">
//                       {/* Image Section */}
//                       <span className='text-xl'>Order #{index+1}</span>
//                       <div className="relative w-full lg:w-1/3 h-32 px-4 lg:h-36 overflow-hidden">
//                         <Button className="size-full bg-transparent text-white border-amber-400 border-2 border-dotted" onClick={() => router.push(`/model/${obj.imageid}`)}>
//                           Click to view design
//                         </Button>
//                       </div>
//                       {/* Details Section */}
//                       <div className="w-full lg:w-2/3 space-y-2 text-slate-400">
//                         <div className="flex justify-between">
//                         <strong>Ordered on:</strong>
//                         <span>{format(parseISO(obj.orderedat), 'yyyy-MM-dd HH:mm:ss')}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <strong>Dimensions:</strong>
//                           <span>{obj.height}x{obj.width}x{obj.thickness} mm</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <strong>Material:</strong>
//                           <span>{obj.material}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <strong>Sheets:</strong>
//                           <span>{obj.sheets}</span>
//                         </div>
//                         <Separator className="my-2" />
//                         <div className="flex justify-between font-bold text-white">
//                           <strong>Total:</strong>
//                           <span>₹ {obj.cost}</span>
//                         </div>
//                       </div>
//                     </section>
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>

//             <div className="w-full min-h-16 px-6 bg-transparent flex justify-between items-center gap-2">
//               <AlertDialog>
//                 <AlertDialogTrigger asChild className="w-1/2">
//                   <Button variant="destructive">Remove</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent className="max-w-[350px] lg:max-w-[450px]">
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>Delete this order?</AlertDialogTitle>
//                     <AlertDialogDescription>This action cannot be undone and will remove this order from line?</AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogAction onClick={() => console.log('delete')}>Delete</AlertDialogAction>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>

//               <Dialog>
//                 <DialogTrigger className="w-1/2" asChild>
//                   <Button type="button">Verify</Button>
//                 </DialogTrigger>
//                 <DialogContent className="w-[350px] px-4 rounded-lg">
//                   <DialogHeader className="px-2">
//                     <DialogTitle className="text-left">Deliver at</DialogTitle>
//                     <DialogDescription className="text-left">Add user address for delivery</DialogDescription>
//                   </DialogHeader>
//                   <form className="space-y-2 px-1" onSubmit={(data) => onAddressSubmit(data, orderGroup[0].$id)}>
//                     <Input className="min-h-24" type="text" placeholder="Add address" required />
//                     <DialogClose asChild>
//                       <Button type="submit">Submit</Button>
//                     </DialogClose>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         ))
//       )}
//     </>
//   );
// }















// 'use client'
// import { Skeleton } from "@/components/ui/skeleton";
// import { getLabel, gettingAdmin } from "@/lib/appwrite.config";
// import { useEffect } from "react";

// export default function Testing(){
//     useEffect(()=>{
//         gettingUser().then((res)=>console.log(res)).catch((error)=>console.log(error))
//     },[])
//     return(
//         <>
//             <main className="h-screen w-full flex justify-center items-center">
//                 <Skeleton className='size-36 border-2 border-amber-400'/>
//             </main>
//         </>
//     )
// }


// 'use client'
// import { useState } from 'react';
// import ProgressBar from '@/components/testing/Test1.jsx';

// export default function Home() {
//   const [status, setStatus] = useState('verified');

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Order Progress</h1>
//       <ProgressBar verified={true} crafted={true} delivered={false} />
      
//       <div className="mt-10">
//         <button
//           onClick={() => setStatus('verified')}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//         >
//           Verified
//         </button>
//         <button
//           onClick={() => setStatus('full')}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Full Progress
//         </button>
//       </div>
//     </div>
//   );
// }




// import { getLocale, getLoggedInUser } from "@/lib/appwrite.config";
// import ServeImages from "@/lib/cloudinary.config";
// import { useEffect } from "react";
// import { toast } from "sonner";
// import { cookier } from "../test";
// import Logout from "@/components/Logout";
// import { useAuthStore } from "@/lib/zustand/store";

// export default function TestRoute(){
//     const folder1 = "ms-crafts AND tags=lg"
//     const folder2 = "ms-crafts AND tags=medium"
//     const user = useAuthStore((state)=>state.user)

//     useEffect(()=>{
//       console.log(user)
//     },[])
//     return(
//         <>
//             <Logout/>
//             {/* <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Borders</span></div>
//               <ServeImages folder={folder1}/>
//             <div className="h-full text-amber-300 text-xl font-bold flex flex-row items-center mt-3 px-4"><span>Panels</span></div>   
//               <ServeImages folder={folder2}/>  */}
//         </>
//     )
// }






























