import { ITopupResponse } from "./apiResponse"

export interface ITopupForm {
    amount: number,
    source_of_fund_id: number
}

export interface ITopupState {
    status: boolean
    data: Partial<ITopupResponse>
}