import { PostType } from 'api/types';
import { RootState } from 'store/store';

export const selectPost = (state: RootState): PostType => {
    return state.posts.posts.currentItem;
};
