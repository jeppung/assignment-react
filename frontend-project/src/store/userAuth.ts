import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAuthStore {
    token: string,
    setToken: (data: string) => void
}

export const useAuthStore = create(
    persist<IAuthStore>((set) => ({
        token: "",
        setToken: (data) => set(() => ({ token: data }))
    }), {
        name: "authToken"
    })
)