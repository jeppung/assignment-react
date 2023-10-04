
import { create } from 'zustand'
import { IUserDataResponse } from '../interfaces/apiResponse'
import { persist } from 'zustand/middleware'


interface IUserDataStore {
    userData: Partial<IUserDataResponse>,
    setUserData: (data: IUserDataResponse) => void
}

export const useUserDataStore = create(
    persist<IUserDataStore>((set) => (
        {
            userData: {},
            setUserData: (data) => set(() => ({ userData: data }))
        }
    ), {
        name: "userData"
    })
)