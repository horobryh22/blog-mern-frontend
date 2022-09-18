import { REQUEST_STATUS } from 'enums';
import { RootState } from 'store/store';

export const selectTagsStatus = (state: RootState): REQUEST_STATUS => {
    return state.posts.tags.status;
};
