export interface ILogin {
    email: string;
    password: string;
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