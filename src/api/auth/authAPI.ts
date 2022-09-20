import { instance } from 'api/config';
import { FormValuesType, UserDataType } from 'api/types';

export const authAPI = {
    login: (userData: Omit<FormValuesType, 'fullName'>) => {
        return instance.post<UserDataType>('/auth/login', userData);
    },
    me: () => {
        return instance.get<Omit<UserDataType, 'token'>>('auth/me');
    },
    register: (userData: FormValuesType) => {
        return instance.post<UserDataType>('/auth/register', userData);
    },
};
