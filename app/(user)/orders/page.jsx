export const runtime = 'nodejs';


import { ListOrders } from "@/lib/appwrite.config";

export default function OrderPage(){
    return(
        <>
            <main className="flex flex-col flex-wrap justify-between gap-4 p-4">
                    <ListOrders/>
            </main>
        </>
    )
}