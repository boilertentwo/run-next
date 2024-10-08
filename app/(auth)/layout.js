import Header from "@/components/Header";

import Statusbar from "@/components/StatusMessage";
export const metadata = {
    title: "Login | orderBook",
  
    description: "Get CNC crafts at lowest price",
  };
export default function AuthLayout({children}){
    return(
        <>
            <main>
                <Header></Header>
                <Statusbar/>
                {children}
            </main>
        </>
    )
}