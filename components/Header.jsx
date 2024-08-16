'use client'
import { useAuthStore } from "@/lib/zustand/store"
import { useEffect } from "react"
import { Bell, Home, LogIn, ShoppingCart } from "lucide-react"
import { Dashboard } from "./Dashboard"
import Link from "next/link"
import Negativehold from "./Negaviteholder"
import Progresser from "./Loader"
import CircleLoad from "./Circleloader"
import Logout from "./Logout"
import { cookier } from "@/app/test"
import { toast } from "sonner"

const Homelink = ()=> {
    return(
        <>
            <Link href={'/'}>
                <h1 className='text-yellow-500 italic content-center font-serif text-3xl font-bold '>orderBook</h1>   
            </Link>
        </>
    )
} 


const LoginLink =() => {
    return(
        <>
            <Link href={'/login'}>
                    <LogIn/>
                </Link>
        </>
    )
}

const Negative = () => {
    return(
        <>
            <Link className="flex flex-row gap-2" href={'/'}>
                    <h1>Home</h1>
                    <Home/>
                    </Link>
                    <Link className="flex flex-row gap-2" href={'/login'}>
                        <h1>Login</h1>
                        <LogIn/>
                    </Link>
        </>
    )
}


export default function Header(){
    const {logOut} = useAuthStore((state)=>state.logOut)
    useEffect(() => {
        const checkUser = () => {
          try {
            const result = cookier(); 
            const userExists = Boolean(result);
      
            if (!userExists) {
              logOut();
            }
          } catch (error) {
            toast('Check internet connection', { description: "Error occurred reading cookies" });
          }
        };
      
        checkUser();
      }, []);
     
    return(
        <>
            <div className="h-16 w-full flex flex-row justify-between items-center p-4">
                <Dashboard/>
                <Homelink></Homelink>
                <div className="min-w-48 hidden lg:flex flex-row justify-between items-center gap-5 ">
                
                
                <Negativehold loader={CircleLoad} negative={Negative} >
                <Link className="flex flex-row gap-2" href={'/'}>
                        <h1>Home</h1>
                        <Home/>
                    </Link>
                    <Link className="flex flex-row gap-2" href={'/orders'}>
                    <h1>Orders</h1>
                    <ShoppingCart/>
                    </Link>
                    <Link className="flex flex-row gap-2" href={'/notification'}>
                    <h1>Notifications</h1>
                    <Bell/>
                    </Link>
                    <Logout/>
                </Negativehold>
                <>
                    
                </>
                
                

                </div>
                <div className="lg:hidden flex">
                <Negativehold loader={CircleLoad} negative={LoginLink}>
                    <Link href={'/orders'}>
                        <ShoppingCart/>
                    </Link>
                </Negativehold>
                </div>
                
            </div>
        </>
    )
}