export interface IAPIResponse {
    code: number,
    data: ILoginResponse | IUserDataResponse | any,
    message: string
}

export interface ILoginResponse {
    token: string
}

interface IUserWallet {
    id: number
    balance: number
    created_at: string
    updated_at: string
}

export interface IUserDataResponse {
    id: number
    email: string
    first_name: string
    last_name: string
    wallet_id: number
    wallet: IUserWallet
    created_at: string
    updated_at: string
}