import { Reducer } from "redux";
import { ILoginState } from "./types";

const INITIAL_STATE: ILoginState = {
    data: { email: '', password: '' },
    warnings: { helperText: '', isButtonDisabled:true, isError:false }
};

const login: Reducer<ILoginState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            console.log('Deu bom!');
            console.log(action.payload);

            return {
                ...state,
            }
        }
        case 'LOGIN_FAILED': {
            console.log('Deu ruim!');
            console.log(action.payload);

            return {
                ...state,
            }
        }
        case 'IS_BUTTON_DISABLED': {
            console.log('button disabled!');
            console.log(action.payload);

            return {
                ...state,
                warnings: {
                    ...state.warnings,
                    isButtonDisabled: action.payload,
                }
            }
        }
        case 'SET_IS_ERROR': {
            console.log('Ta com erro!');
            console.log(action.payload);

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