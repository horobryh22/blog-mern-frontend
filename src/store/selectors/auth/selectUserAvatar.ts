import { RootState } from 'store/store';

export const selectUserAvatar = (state: RootState): string => {
    return state.auth.data.avatarUrl;
};
