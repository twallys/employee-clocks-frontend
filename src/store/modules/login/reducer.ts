import { Reducer } from "redux";
import { ILogin, ILoginState } from "./types";

const INITIAL_STATE: ILoginState = {
    data: { id: '', name: '', email: '', token: '' },
    warnings: { helperText: '', isButtonDisabled:true, isError:false }
};

const login: Reducer<ILoginState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {

            let dataForm:ILogin = {};
            dataForm = action.payload.user;
            dataForm.token = action.payload.token;

            return {
                ...state,
                data: dataForm,
            }
        }
        case 'LOGIN_FAILED': {
            return {
                ...state,
                warnings: {
                    ...state.warnings,
                    isError: action.payload,
                    helperText: 'Try again!'
                }
            }
        }
        case 'REGISTER_SUCCESS': {
            return {
                ...state,
                data: action.payload
            }
        }
        case 'REGISTER_FAILED': {
            return {
                ...state,
            }
        }
        case 'IS_BUTTON_DISABLED': {
            return {
                ...state,
                warnings: {
                    ...state.warnings,
                    isButtonDisabled: action.payload,
                }
            }
        }
        case 'SET_IS_ERROR': {
            return {
                ...state,
                warnings: {
                    ...state.warnings,
                    isError: action.payload,
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default login;