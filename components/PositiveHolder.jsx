import { useAuthStore } from "@/lib/zustand/store";

export function PositiveHold({loader:LoadingComponent, positive:PositiveComponent, children}){
    const {loading, isLoggedIn} = useAuthStore((state)=>({loading:state.loading, isLoggedIn:state.IsAuthenticated}))
    
    if(loading){
        return <LoadingComponent/>
    }

    return(
        <>
            {!isLoggedIn?children:<PositiveComponent/>}
        </>
    )
}