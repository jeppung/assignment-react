
import { create } from 'zustand'
import { IUserDataResponse } from '../interfaces/apiResponse'

interface IUserDataStore {
    userData: Partial<IUserDataResponse>,
    setUserData: (data: IUserDataResponse) => void
}

export const useUserDataStore = create<IUserDataStore>((set) => (
    {
        userData: {},
        setUserData: (data) => set(() => ({ userData: data }))
    }
))