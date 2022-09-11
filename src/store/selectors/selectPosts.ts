import { PostType } from 'api/types';
import { RootState } from 'store/store';

export const selectPosts = (state: RootState): PostType[] => {
    return state.posts.posts.items;
};
