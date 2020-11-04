import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { API_BASE_URL } from '../config/api';

const CONFIG: Readonly<AxiosRequestConfig> = Object.freeze({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export const request: AxiosInstance = axios.create(CONFIG);

export const setAuthToken = (token: string): void => {
    if (token) {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete request.defaults.headers.common['Authorization'];
    }
};

