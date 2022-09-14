import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4444/',
});

instance.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.Authorization = window.localStorage.getItem('token') as string;
    }

    return config;
});
