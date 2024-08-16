import LoginCard from "@/components/LoginCard";
import { SecureCard } from "@/components/SecureCard";

export default function LoginPage(){
    return(
        <>
            <div className="h-[800px] xl:h-full xl:p-24 w-full flex flex-col xl:flex-row justify-around items-center">
                <LoginCard/>
                <SecureCard/>
            </div>
           
        </>
    );
}