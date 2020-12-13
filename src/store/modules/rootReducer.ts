import { combineReducers } from 'redux';
import cart from './cart/reducer';
import login from './login/reducer';
import clocks from './clocks/reducer';

export default combineReducers({
    cart,
    login,
    clocks,
})