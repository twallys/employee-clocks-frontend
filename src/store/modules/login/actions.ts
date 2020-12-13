import axios from 'axios';
import { Dispatch } from 'redux';
import { ILogin } from "./types";

export async function singin(login: ILogin) {

    const request = axios.post('/sessions', login);
    return (dispatch: Dispatch) =>
        request.then(function (response) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data,
            })
            // dispatch(setLoadingRede(false));
        })
        .catch(function (error) {
            dispatch({
                type: 'LOGIN_FAILED',
                payload: [],
            })
            // dispatch(EclesiaActions.showMessage({ message: "Não foi possível listar as Redes", variant: 'error' }));
            // dispatch(setLoadingRede(false));
        })
    
}

export function isButtonDisabled(bool: boolean) {
    return {
        type: 'IS_BUTTON_DISABLED',
        payload: bool
    }
}

export function setIsError(bool: boolean) {
    return {
        type: 'SET_IS_ERROR',
        payload: bool
    }
}