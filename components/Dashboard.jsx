import { Bell, Handshake, Home, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "./ui/separator";
import Logout from "./Logout";
import Negativehold from "./Negaviteholder";
import Progresser from "./Loader";
import { EmptyBar } from "./StatusMessage";
import { Button } from "./ui/button";


  
export function Dashboard(){
    return(
        <>
            

            
            <Sheet >
            <SheetTrigger className="md:hidden"><Menu/></SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                <SheetTitle className='text-yellow-500 text-2xl mt-4 text-left'>Explore</SheetTitle>
                <SheetDescription className='text-left'>
                        We provide CNC services
                </SheetDescription>
                </SheetHeader>
                <div className="xl:hidden h-fit text-xl font-normal flex flex-col my-5 gap-2 ">
                <Link href={'/'}>
                <SheetClose className="w-full gap-10 flex flex-row justify-between items-center p-2 ">
                        <span>Home</span>        
                        <Home/>
                </SheetClose>
                </Link>    
                <Link href={'/orders'}>
                <SheetClose className="w-full gap-10 flex flex-row justify-between items-center p-2">
                        <span>Orders</span>        
                        <ShoppingCart/>
                </SheetClose>
                </Link>    
                
                <Link href={'/notification'}>
                <SheetClose className="w-full gap-10 flex flex-row justify-between items-center p-2">
                        <span>Notification</span>        
                        <Bell/>
                </SheetClose>
                </Link>      
                <Separator/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Negativehold loader={Progresser} negative={EmptyBar}>
                                <Logout/>
                        </Negativehold>
                    </SheetClose>
                    
            </SheetFooter>
            </SheetContent>
        </Sheet>
        
        </>
    )
}