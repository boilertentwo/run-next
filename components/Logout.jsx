'use client'
import { Button } from "@/components/ui/button"
import { clearSession } from "@/app/test"
import { useAuthStore } from "@/lib/zustand/store"
import { useRouter } from "next/navigation"
import { AlertDialogHeader, AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogAction,AlertDialogCancel,AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"



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
        <AlertDialog>
          <AlertDialogTrigger asChild><Button variant='destructive' type='button'>Logout</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>You will not be notified of any active orders.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild><Button type='submit'>Confirm</Button></AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      
      </form>
    </>
  )
}