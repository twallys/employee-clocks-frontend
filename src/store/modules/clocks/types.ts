export interface IAppointment {
    id: string;
    provider_id?: string;
    date?: Date;
    clocks_in?: string;
    clocks_out_lunch?: string;
    clocks_in_lunch?: string;
    clocks_out?: string;
}

export interface IClocksWarning {
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
}

export interface IClocksState {
    data: IAppointment[],
    warnings: IClocksWarning,
    appointment: IAppointment,
    modal: boolean
}