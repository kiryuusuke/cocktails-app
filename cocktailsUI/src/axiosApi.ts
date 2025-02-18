import {BASE_URL} from "./globalConstants.ts";
import {RootState} from "./app/store.ts";
import {Store} from "@reduxjs/toolkit";
import axios, {AxiosHeaders, InternalAxiosRequestConfig} from "axios";

const axiosApi = axios.create({
    baseURL: BASE_URL
});

export const addInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token = store.getState().users.user?.token;
        const headers = config.headers as AxiosHeaders;
        headers.set('Authorization', token);

        return config;
    })
}

export default axiosApi;