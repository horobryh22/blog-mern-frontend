import { UserDataType } from 'api/types';

export const setValueToLocalStorage = (payload: UserDataType | string): void => {
    if (!payload) return;

    if (typeof payload === 'string') return;

    if ('token' in payload) {
        window.localStorage.setItem('token', payload.token!);
    }
};
