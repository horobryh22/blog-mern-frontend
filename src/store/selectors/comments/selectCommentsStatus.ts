import { REQUEST_STATUS } from 'enums';
import { RootState } from 'store/store';

export const selectCommentsStatus = (state: RootState): REQUEST_STATUS => {
    return state.comments.status;
};
