import {createAsyncThunk} from "@reduxjs/toolkit";

import {isAxiosError} from "axios";
import {GlobalError, LoginUser, RegisterResponse, RegisterUser, User, ValidationErr} from "../../typesUI.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const googleLogin = createAsyncThunk<User, string, {rejectValue: GlobalError}>(
    'users/googleLogin',
    async(credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('users/google', {credential});
            return response.data.user
        } catch(e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e
        }
    }
)


export const register = createAsyncThunk<RegisterResponse,
    RegisterUser,
    { rejectValue: ValidationErr }
>(
    'users/register',
    async (register: RegisterUser, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('email', register.email);
            formData.append('password', register.password);
            formData.append('displayName', register.displayName);
            if (register.userAvatar) {
                formData.append('userAvatar', register.userAvatar);
            }

            const response = await axiosApi.post<RegisterResponse>('/users/register', formData);

            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginUser, {rejectValue: GlobalError}>(
    'users/login',
    async(login, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', login);
            console.log(response.data.user);
            return response.data.user;
        } catch(e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e
        }
    }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
    'users/logout',
    async(_, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete('/users/sessions', {headers: {'Authorization': token}});
    }
);