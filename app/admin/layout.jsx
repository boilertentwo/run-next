import { Toaster } from "sonner";
import Header from "@/components/Header";

export const metadata = {
    title: "Admin | orderBook",
  
    description: "Get CNC crafts at lowest price",
  };

export default function AdminLayout({children}){
    return(
        <>
            <main>
                <Header/>
                {children}
                <Toaster/>
            </main>
        </>
    )
}