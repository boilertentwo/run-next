'use client'
import { Button } from "@/components/ui/button"
import { clearSession } from "@/app/test"
import { useAuthStore } from "@/lib/zustand/store"
import { useRouter } from "next/navigation"

export default  function Logout(){
  const router = useRouter()
  const Logout = useAuthStore((state)=>state.logOut)
  const userLogOut = async(event) => {
    event.preventDefault();
    try {
      await clearSession();
      Logout();
      useAuthStore.persist.clearStorage()
      router.push('/')
    } catch (error) {
      console.log('error logging out:',error)
    }
    
  }
  
  return(
    <>
      <form onSubmit={userLogOut}>
      <Button variant='destructive' type='submit'>Logout</Button>
      </form>
    </>
  )
}