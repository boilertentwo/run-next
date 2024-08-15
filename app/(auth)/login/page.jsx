import LoginCard from "@/components/LoginCard";
import { SecureCard } from "@/components/SecureCard";

export default function LoginPage(){
    return(
        <>
            <div className="h-[800px] w-full flex flex-col justify-around items-center">
                <LoginCard/>
                <SecureCard/>
            </div>
           
        </>
    );
}