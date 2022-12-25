export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const LOAD_CURRENT_LOGIN_USER_REQUEST = 'LOAD_CURRENT_LOGIN_USER_REQUEST';
export const LOAD_CURRENT_LOGIN_USER_SUCCESS = 'LOAD_CURRENT_LOGIN_USER_SUCCESS';
export const LOAD_CURRENT_LOGIN_USER_FAILURE = 'LOAD_CURRENT_LOGIN_USER_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export interface AuthenticatedUser {
    _id : string;
    first_name: string;
    last_name: string;
    avatar: string;
    roles: string[];
}

// ghi nho : 1 action bao gom type + payload

// duoi day la dinh nghia cac action dung cho login va logout

interface LoginRequest {
    type : typeof LOGIN_REQUEST;
    payload: {
        username : string;
        password : string;
    };
}

interface LoginSuccess {
    type : typeof LOGIN_SUCCESS;
    payload: {
        token : string;
        refreshToken : string;
        user : AuthenticatedUser;
    }
}

interface LoginFailure {
    type : typeof LOGIN_FAILURE;
    payload : {
        error : string;
    }
}

interface Logout {
    type : typeof LOG_OUT;
}

interface LoadCurrentLoginUserRequest {
    type : typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

interface LoadCurrentLoginUserSuccess {
    type : typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
    payload : {
        user : AuthenticatedUser;
    };
}

interface LoadCurrentLoginUserFailure {
    type : typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
    payload : {
        error : string;
    }
}

interface RefreshTokenRequest {
    type: typeof REFRESH_TOKEN_REQUEST;
}

interface RefreshTokenSuccess {
    type: typeof REFRESH_TOKEN_SUCCESS;
    payload : {
        token: string;
        refreshToken: string;
    };
}

interface RefreshTokenFailure {
    type: typeof REFRESH_TOKEN_FAILURE;
    payload: {
        error: string;
    };
}

// dinh nghia 1 state cho account, se luu thong tin nay duoi store

export interface AccountState {
    user : AuthenticatedUser | null;
    loading : boolean;
    error : string | null;
    token : string | null;
    refreshToken: string | null;
}

export type AccountActionTypes = 
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | Logout
    | LoadCurrentLoginUserRequest
    | LoadCurrentLoginUserSuccess
    | LoadCurrentLoginUserFailure
    | RefreshTokenRequest
    | RefreshTokenSuccess
    | RefreshTokenFailure;