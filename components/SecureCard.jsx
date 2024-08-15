import { Check } from "lucide-react"

export function SecureCard(){
    return(
        <>
            <main className="p-5 min-h-72 max-w-80 text-lg flex flex-col justify-around items-center border-2 rounded-lg">
                <div className="flex flex-row gap-4 justify-around items-center">
                    <span>
                    <Check className="stroke-sky-500"/>
                    </span>
                    <span>Enable pick-up and delivery services.</span>
                </div>
                <div className="flex flex-row gap-4 justify-around items-center">
                    <span>
                    <Check className="stroke-sky-500"/>
                    </span>
                    <span>Endless designs to choose from.</span>
                </div>
                <div className="flex flex-row gap-4 justify-around items-center">
                    <span>
                    <Check className="stroke-sky-500"/>
                    </span>
                    <span>Secure and encrypted services, end to end.</span>
                </div>
                <div className="flex flex-row gap-4 justify-around items-center">
                    <span>
                    <Check className="stroke-sky-500"/>
                    </span>
                    <span>Get quotation on the designs you have.</span>
                </div>
            </main>
        </>
    )
}