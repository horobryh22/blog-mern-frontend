import { CommentType } from 'api/types';
import { RootState } from 'store/store';

export const selectLastComments = (state: RootState): CommentType[] => {
    return state.comments.items;
};
