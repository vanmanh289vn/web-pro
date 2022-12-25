import { REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, LOG_OUT } from './../store/account/types';
import axios from "axios";
import env from 'react-dotenv';
import { UrlConstants } from "../constants";
import { AppState, store } from "../store";
// import { logout } from "../store/account/actions";
import { history } from "./history";
import swal from 'sweetalert'

const api = axios.create({
    baseURL: `${env.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log(err);
        if(err.response.status === 401){
            // store.dispatch(logout());
            // history.push(UrlConstants.LOGIN);
            const originalRequest = err.config;
            const currentState = store.getState() as AppState;
            const refreshToken = currentState.account.refreshToken;

            // Prevent infinite loops
            if(err.response.status === 401 && 
               originalRequest.url === '/api/auth/refreshtoken' ){
                history.push(UrlConstants.LOGIN);
                return Promise.reject(err);
               }

            if(err.response.status === 401 &&
               err.response.data.error === 'Unauthorized' ){
                if(refreshToken){
                    console.log('Xu ly refresh token ...');
                    store.dispatch({
                        type: REFRESH_TOKEN_REQUEST,
                    });
                    return api.post('/auth/refreshtoken', {refreshToken: refreshToken})
                    .then((response) => {
                        store.dispatch({
                            type: REFRESH_TOKEN_SUCCESS,
                            payload: {
                                token: response.data.token,
                                refreshToken: response.data.refreshToken,
                            },
                        });
                        api.defaults.headers.common['x-auth-token'] = response.data.token;
                        originalRequest.headers['x-auth-token'] = response.data.token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        store.dispatch({
                            type: REFRESH_TOKEN_FAILURE,
                            payload: {
                                error: err.ToString()
                            },
                        });
                        console.log(err);
                        history.push(UrlConstants.LOGIN);
                    });
                } else {
                    console.log('Refresh token not available.');
                    history.push(UrlConstants.LOGIN);
                }
               }
        } else if(err.response.status === 403 && err.config.url === "/auth/refreshtoken"){
            console.log('Het han refreshToken..');
            store.dispatch({
                type: LOG_OUT,
            });
            history.push(UrlConstants.LOGIN);
        } else if(err.response.status === 403){
            console.log('Forbiden - Khong co quyen vao trang nay');
            // store.dispatch({
            //     type: LOG_OUT,
            // });
            // history.push(UrlConstants.LOGIN);
            // history.push(UrlConstants.FORBIDDEN);
            swal({
                title: 'Xác nhận',
                text: 'Ban khong duoc phep truy cap link nay',
                icon: 'warning',
                buttons: ['Hủy', 'Xác nhận'],
                dangerMode: true,
            }).then((willDelete) => {
                if(willDelete){
                    console.log('Xac nhan thanh cong..')
                    history.push(UrlConstants.HOME);
                }
            });
        }
        return Promise.reject(err);
    }
);

export {api};