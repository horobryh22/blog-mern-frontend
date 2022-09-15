import { RootState } from 'store/store';

export const selectAuthUserId = (state: RootState): string => {
    return state.auth.data._id;
};
