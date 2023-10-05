import { ITopupResponse } from "./apiResponse"

export interface ITransferState {
    status: boolean
    data: Partial<ITopupResponse>
}

export interface ITransferForm {
    amount: number
    to: number
    description: string
}