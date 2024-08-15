'use client'
import { cookier } from '@/app/test'
import Progresser from '@/components/Loader'
import { useState, useEffect, createContext, useContext } from 'react'



const authContext = createContext()

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return(
        <>
            <authContext.Provider value={{isLoggedIn,}}>
                {children}
            </authContext.Provider>
        </>
    )
}

export function useAuth(){
    return useContext(authContext)
}