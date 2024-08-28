import Header from "@/components/Header";
export const metadata = {
    title: "Craft N Carve | orderBook",
  
    description: "Get CNC crafts at lowest price",
  };
import Statusbar from "@/components/StatusMessage";
export default function UserLayout({children}){
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