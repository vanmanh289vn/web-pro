import { setAuthToken } from './../helpers';
import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import { accountReducer } from "./account/reducers";
import thunkMiddleware from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from './users/reducers';
import { alertReducer } from './alert/reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account']
};



// tao 1 root reducer --> tuong tu nhu tao ra 1 co so du lieu
// Trong CSDL thi se co nhieu bang, o day ban dau se co bang account

const rootReducer = combineReducers({
    account: accountReducer,
    users: usersReducer,
    alert: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Khai bao 1 AppState --> la state tong cua app
export type AppState = ReturnType<typeof rootReducer>;


// tao 1 store bao gom ban dau la 1 reducer : accountReducer
// vi the Khi reducer tuong tac thi App se nhan duoc 1 state moi tu cac action ben ngoai dispatch vao
// hay noi cach khac, moi khi reducer tuong tac thi se duoc phan anh vao AppState (state tong)

const configureStore = () => {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
}

const store = configureStore();
const persistedStore = persistStore(store);

let currentState = store.getState() as AppState;
// let previousState = currentState;
// console.log('currentState before : ' + currentState.account.token);

// fix isssue : luon thuc hien setAuthToken sau moi lan ctrl + F5
// Expected : Chi thuc hienj setAuthToken khi co thay doi giua previousState va currentState
// dang nay previousState luon co gia tri la null --> dan den luon thuc hien viec setAuthToken

store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState() as AppState;

    // console.log('previoustState : ' + previousState.account.token);
    // console.log('currentState : ' + currentState.account.token);
    // if the token changes set the value in localStorage and axios headers
    if(previousState.account.token !== currentState.account.token){
        const token = currentState.account.token;
        if(token){
            setAuthToken(token);
            // vay la tai xu ly nay, cu token thay doi 
            // thi se tu dong set token len headers ma ko can set nhieu cho khac nua
        }
    }
});

export {
    store,
    persistedStore
};
