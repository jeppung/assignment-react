import { create } from "zustand";
import { ITopupResponse, ITransactionsResponse } from "../interfaces/apiResponse";
import { persist } from "zustand/middleware";

interface ITransactionsStore {
    transactions: Partial<ITransactionsResponse>
    setTransactions: (data: ITransactionsResponse) => void
}

export const useTransactionsStore = create(
    persist<ITransactionsStore>((set) => ({
        transactions: {},
        setTransactions: (data) => set(() => ({ transactions: data }))
    }), { name: "transactions" })
)