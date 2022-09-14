import { instance } from 'api/config';
import { UserDataType } from 'api/types';

export const authAPI = {
    fetchUserData: () => {
        return instance.get<UserDataType>('/auth/login');
    },
};
