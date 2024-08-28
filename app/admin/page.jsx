import GetUserDocums from "./appwrite.admin"

export default function AdminPage(){
    return(
        <>
            <main className="w-full h-screen p-4 flex flex-col">
            <GetUserDocums/>
            </main>
           
        </>
    )
}