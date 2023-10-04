export interface IAPIResponse {
    code: number,
    data: LoginResponse | any,
    message: string
}

export interface LoginResponse {
    token: string
}