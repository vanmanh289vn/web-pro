// import env from 'react-dotenv';
import {api, IPagination} from '../helpers';
import { IAddUserRequest, IUpdateUserRequest, IUser } from '../store/users/types';

const login = async (username: string, password: string): Promise<any> => {
    const body = {username, password};

    return await api.post<any>('/auth/signin', body).then((response) => {
        // sessionStorage.setItem('user', JSON.stringify(response.data));

        // vi api axios goi du lieu tra ve trong thuoc tinh data,  nen phai return nhu duoi :
        return response.data;
    });
};

const addUser = async (user: IAddUserRequest): Promise<any> => {
    const res = await api.post(`/auth/signup`, user).then((response) => {
        return response.data;
    });
    return res;
};

const logout = () => {
    sessionStorage.removeItem('user');
};

// const getUsersPaging = async (currentPage: number, keyword: string) : Promise<IPagination<IUser>> => {
//     const res = await api.get<IPagination<IUser>>(`/pagingusers?page=${currentPage}&email=${keyword}`)
//     .then((response) => {
//         return response.data;
//     });

//     return res;
// };

const getUsersPaging = async (currentPage: number, keyword: string, pageSize: number) : Promise<IPagination<IUser>> => {
    const res = await api.get<IPagination<IUser>>(`/pagingusers?page=${currentPage}&email=${keyword}&pageSize=${pageSize}`)
    .then((response) => {
        return response.data;
    });

    return res;
};

const updateUser = async (
    id: string,
    user: IUpdateUserRequest
): Promise<any> => {
    const res = await api.put(`/users/${id}`, user).then((response) => {
        return response.data;
    });
    return res;
};

const getUserById = async (id: string): Promise<IUser> => {
    const res = await api.get<IUser>(`/users/${id}`).then((response) => {
        return response.data;
    });
    return res;
};

const deleteUsers = async (ids: string[]): Promise<any> => {
    const res = await api.delete(`/users?ids=${ids}`).then((response) => {
        return response.data;
    });
    return res;
};

export const userService = {
    login,
    logout,
    getUsersPaging,
    addUser,
    updateUser,
    getUserById,
    deleteUsers,
};
