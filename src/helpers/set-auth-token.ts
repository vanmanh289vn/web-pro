import {api} from './';

// thao khao them
// authHeader() : https://www.bezkoder.com/react-hooks-redux-login-registration-example/

export const setAuthToken = (token: string) => {
    if(token){
        console.log('set token cho headers..');
        console.log(token);
        // let prefix = 'Bearer ';
        // api.defaults.headers.common['Authorization'] = prefix + token;
        api.defaults.headers.common['x-auth-token'] = token;
        
        
        
    } else {
        // delete api.defaults.headers.common['Authorization'];
        delete api.defaults.headers.common['x-auth-token'];
        
    }
};
