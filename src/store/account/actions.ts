import { userService } from './../../services/user.service';
import { AccountActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from './types';
import { Dispatch } from "redux";

export const login = (username: string, password: string) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: username,
                password: password,
            },
        });

        try {
            const response = await userService.login(username, password);
            dispatch({
                type: LOGIN_SUCCESS,
                payload : response,
            });
        } catch (error : any) {
            dispatch({
                type : LOGIN_FAILURE,
                payload : {error : error.toString()},
            });
        }

        // userService.login(username, password).then((res) => {
        //     dispatch({
        //         type: LOGIN_SUCCESS,
        //         payload: res,
        //     });
        //     history.push(from);
        // }, (error) => {
        //     dispatch({
        //         type: LOGIN_FAILURE,
        //         payload: {error : error.toString() },
        //     });
        // });
    };
};

// export const getCurrentLoginUser = () => {
//     return async (dispatch: Dispatch<AccountActionTypes>) => {
//         dispatch({
//             type: LOAD_CURRENT_LOGIN_USER_REQUEST,
//         });
//         try {
//             const response = await userService.getCurrentLoginUser();
//             dispatch({
//                 type : LOAD_CURRENT_LOGIN_USER_SUCCESS,
//                 payload: {user : response},
//             });
//         } catch (error : any) {
//             dispatch({
//                 type : LOAD_CURRENT_LOGIN_USER_FAILURE,
//                 payload : {error : error.toString()},
//             });
//         }
//     }
// }

export const logout = (): AccountActionTypes => {
    return {type: LOG_OUT,};
};