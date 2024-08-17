'use client'
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/store';
import { clearSession } from '@/app/test';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';


export default function Logout() {
  const router = useRouter();
  const Logout = useAuthStore((state) => state.logOut);

   const loggingOut = () => {
      Logout()
      useAuthStore.persist.clearStorage()
      toast("You're Logged out!",{description:"Login to get follow back on orders"})
  }

  const handleLogout = () => {
    // try {
    //   await clearSession(); 
    //   Logout(); 
    //   useAuthStore.persist.clearStorage();
    //   router.push('/'); 
    // } catch (error) {
    //   console.error('Error logging out:', error);
    // }
    clearSession().then(loggingOut).catch((error)=>{toast("Error occured",{description:"While logging user out."})})
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will not be notified of any active orders.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleLogout}>
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
