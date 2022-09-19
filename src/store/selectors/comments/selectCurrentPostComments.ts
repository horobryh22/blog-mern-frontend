import { CommentType } from 'api/types';
import { RootState } from 'store/store';

export const selectCurrentPostComments = (state: RootState): CommentType[] => {
    return state.comments.selectedItems;
};
