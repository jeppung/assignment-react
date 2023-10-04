import { ITopupResponse } from "./apiResponse"

export interface IModal {
    onClose: () => void
    data: ITopupResponse
}