import { instance } from 'api/config';
import { FormValuesType, UserDataType } from 'api/types';

export const authAPI = {
    fetchUserData: (userData: FormValuesType) => {
        return instance.post<UserDataType>('auth/login', userData);
    },
    me: () => {
        return instance.get<Omit<UserDataType, 'token'>>('auth/me');
    },
};
