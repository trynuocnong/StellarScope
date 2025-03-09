import axios from 'axios';
import {BASE_URL} from '@env';

export type ResponseAPI<T> = {
    data: T;
    status: number;
    statusText: string;
}

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
    (response) => {
        console.log(`${response.request} Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
