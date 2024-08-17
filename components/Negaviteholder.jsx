import { useAuthStore } from "@/lib/zustand/store"

export default function Negativehold({loader:LoadingComponent,negative:NegativeComponent,children}){
    const loading = useAuthStore((state)=>state.loading)
    const isLoggedIn = useAuthStore((state)=>state.isAuthenticated)   
    
    
    if(loading){
        return <LoadingComponent/>
    }
    if(!children){
        return (
            <>
                {!isLoggedIn?<NegativeComponent/>:null}
            </>
        )
    }
   
    return(
        <>
            {isLoggedIn?children:<NegativeComponent/>}
        </>
    )
}