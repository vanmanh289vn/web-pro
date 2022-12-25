import { AccountState, AccountActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT, LOAD_CURRENT_LOGIN_USER_REQUEST, LOAD_CURRENT_LOGIN_USER_SUCCESS, LOAD_CURRENT_LOGIN_USER_FAILURE, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE } from './types';
const initialState: AccountState = {
    user : null,
    loading : false,
    error : null,
    token : null,
    refreshToken : null,
}


// day la 1 poor function, khong lam gi ngoai viec tra ve state tuy theo action va state cu

const accountReducer = (
    state : AccountState = initialState,
    action : AccountActionTypes
) : AccountState => {
    switch(action.type){
        case LOGIN_REQUEST: {
            return {...state, loading : true, error : null};
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                error : null,
                token: action.payload.token,
                user : action.payload.user,
                refreshToken: action.payload.refreshToken,
            };
        }
        case LOGIN_FAILURE : {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }
        case LOG_OUT : {
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                error: null
            };
        }

        case LOAD_CURRENT_LOGIN_USER_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loading : false,
                user : action.payload.user,
            };
        }

        case LOAD_CURRENT_LOGIN_USER_FAILURE: {
            return {
                ...state,
                loading : false,
                error : action.payload.error,
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
            };
        }
        case REFRESH_TOKEN_FAILURE: {
            return  {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        default : 
            return state;
    }
};

// sau khi reducer xu ly, store se hung ket qua state hien tai nay

export {accountReducer};