import { RootState } from 'store/store';

export const selectIsUserLogged = (state: RootState): boolean => {
    return state.auth.isUserLogged;
};
