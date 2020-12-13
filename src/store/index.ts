import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./modules/rootReducer";
import { ICartState } from "./modules/cart/types";
import { ILoginState } from './modules/login/types';
import { IClocksState } from './modules/clocks/types';

export interface IState {
    cart: ICartState;
    login: ILoginState;
    clocks: IClocksState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
);

// sagaMiddleware.run()

export default store;