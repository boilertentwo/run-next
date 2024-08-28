import { Inter } from "next/font/google";
import "./globals.css";
import Themeprovider from "@/components/Themeprovider";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Craft N Carve | orderBook",

  description: "Get CNC crafts at lowest price",
};

export default function RootLayout({ children }) { 
  return (
    <html suppressHydrationWarning lang="en">
        <body className={`${inter.className} md:px-10`}>
        <AuthProvider>
        <Themeprovider>
               {children}
               <Toaster/>
          </Themeprovider>
        </AuthProvider>
        </body>
    </html>
  );
}
