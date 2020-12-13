import { combineReducers } from 'redux';
import cart from './cart/reducer';
import login from './login/reducer'

export default combineReducers({
    cart,
    login
})