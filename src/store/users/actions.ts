import { AlertActionTypes } from './../alert/types';
import { userService } from './../../services';
import { UsersActionTypes, LOAD_USERS_PAGING_REQUEST, LOAD_USERS_PAGING_SUCCESS, LOAD_USERS_PAGING_FAILURE, IAddUserRequest, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE, IUpdateUserRequest, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE, DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS, DELETE_USERS_FAILURE } from './types';
import { Dispatch, AnyAction } from "redux"
import { history } from '../../helpers';
import { UrlConstants } from '../../constants';
import { alertError, alertSuccess, clearAlert } from '../alert/actions';
import { ThunkDispatch } from 'redux-thunk';

export const loadUsersPaging = (currentPage: number, keyword: string, pageSize: number) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: LOAD_USERS_PAGING_REQUEST,
            });

            console.log('Chuan bi load data users...');
            const res = await userService.getUsersPaging(currentPage, keyword, pageSize);
            console.log('Da load data users xong...');
            console.log(res);

            dispatch({
                type: LOAD_USERS_PAGING_SUCCESS,
                payload: res,
            });
        } catch (error: any) {
            dispatch({
                type: LOAD_USERS_PAGING_FAILURE,
                payload: { error : error.toString()},
            });
        }
    };
};

export const addUser = (user: IAddUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: ADD_USER_REQUEST,
            });
            await userService.addUser(user);
            dispatch({
                type: ADD_USER_SUCCESS,
            });

            dispatch(alertSuccess('Thêm người dùng thành công!'));

            history.push(UrlConstants.USERS_LIST)
        } catch (error: any) {
            dispatch({
                type: ADD_USER_FAILURE,
                payload: {error: error.toString()},
            });
            dispatch(alertError('Thêm người dùng thất bại!'));
        }

        setTimeout(() => {
            dispatch(clearAlert());
        }, 10000);
    }
}

export const updateUser = (id: string, user: IUpdateUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: UPDATE_USER_REQUEST,
            });

            await userService.updateUser(id, user);

            dispatch({
                type: UPDATE_USER_SUCCESS,
            });

            dispatch(alertSuccess('Cập nhật người dùng thành công'));

            history.push(UrlConstants.USERS_LIST);
        } catch (error: any) {
            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: {error : error.toString()},
            });
            dispatch(alertError('Cập nhật người dùng thất bại'));
        }
        setTimeout(() => {
            dispatch(clearAlert());
        }, 5000);
    };
}

export const getUserById = (id: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: GET_USER_BY_ID_REQUEST,
            });

            const res = await userService.getUserById(id);

            dispatch({
                type: GET_USER_BY_ID_SUCCESS,
                payload: {
                    user: res,
                },
            });
        } catch (error: any) {
            dispatch({
                type: GET_USER_BY_ID_FAILURE,
                payload: {error : error.toString()},
            });
        }
    };
}

export const deleteUsers = (userIds: string[]) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        try {
            dispatch({
                type: DELETE_USERS_REQUEST,
            });

            await userService.deleteUsers(userIds);

            dispatch({
                type: DELETE_USERS_SUCCESS,
            });
            dispatch(loadUsersPaging(1, '', 3));
        } catch (error: any) {
            dispatch({
                type: DELETE_USERS_FAILURE,
                payload: {error: error.toString()},
            });
        }
    };
};