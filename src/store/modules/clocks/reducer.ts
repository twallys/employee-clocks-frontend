import { Reducer } from "redux";
import { IAppointment, IClocksState } from "./types";

const INITIAL_STATE: IClocksState | IAppointment = {
    data: [],
    warnings: { helperText: '', isButtonDisabled:true, isError:false },
    appointment: {id: ''},
    modal: false
};

const login: Reducer<IClocksState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_APPOINTMENTS': {
            return {
                ...state,
                data: action.payload
            }
        }
        case 'GET_APPOINTMENT': {
            return {
                ...state,
                appointment: action.payload,
                modal: true
            }
        }
        case 'NEW_APPOINTMENT': {
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload
                ],
                modal: false
            }
        }
        case 'NEW_APPOINTMENT_FAILED': {
            return {
                ...state,
                modal: true
            }
        }
        case 'UPDATE_APPOINTMENT': {

            let newData = state.data;
            for (let i = 0; i < newData.length; i++) {
                if(newData[i].id === state.appointment.id){
                    newData[i] = action.payload;
                }
            }

            return {
                ...state,
                data: newData,
                modal: false
            }
        }
        case 'UPDATE_APPOINTMENT_FAILED': {
            return {
                ...state,
                modal: true
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                modal: false
            }
        }
        case 'OPEN_MODAL': {
            return {
                ...state,
                modal: true
            }
        }
        default: {
            return state;
        }
    }
}

export default login;