import { REQUEST_STATUS } from 'enums';
import { RootState } from 'store/store';

export const selectPostStatus = (state: RootState): REQUEST_STATUS => {
    return state.posts.posts.status;
};
