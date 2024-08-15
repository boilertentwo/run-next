import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            loading: true,
            user: null,
            isAuthenticated:false,
            setLoading: (isLoading) => set(()=>({loading: isLoading})),
            logIn: (user) => set(() => ({ user : user.userId, isAuthenticated: true })),
            logOut: () => set(() => ({ user : null, isAuthenticated: false })),
        }),
        {
            name: 'orderBook-user',
            storage: createJSONStorage(()=>localStorage) ,
            onRehydrateStorage: () => (state)=>{
                state.setLoading(false)
            }
        }
    )
    
)