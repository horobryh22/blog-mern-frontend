import { RootState } from 'store/store';

export const isUserLogged = (state: RootState): boolean => {
    return state.auth.isUserLogged;
};
