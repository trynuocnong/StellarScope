import axios from 'axios';
import {NASA_URL} from '@env';

export type ResponseAPI<T> = {
    data: T;
    status: number;
    statusText: string;
}

const AxiosInstance = axios.create({
    baseURL: NASA_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
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
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
        } else {
            console.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
