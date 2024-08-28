import CircleLoad from "@/components/Circleloader";


export default function Loaderpage(){
    return (
        <>
            <main className="w-full h-screen flex justify-center items-center">
                <CircleLoad className='stroke-amber-400 size-24'/>
            </main>
        </>
    )
}