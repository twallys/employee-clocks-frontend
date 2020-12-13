export interface ILogin {
    email?: string;
    password?: string;
    token?:string;
    id?:string;
    name?:string;
}

export interface ILoginWarning {
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
}

export interface ILoginState {
    data: ILogin,
    warnings: ILoginWarning
}