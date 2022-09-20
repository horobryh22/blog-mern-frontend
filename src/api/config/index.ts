import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.Authorization = window.localStorage.getItem('token') as string;
    }

    return config;
});
