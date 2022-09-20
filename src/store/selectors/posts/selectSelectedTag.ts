import { RootState } from 'store/store';

export const selectSelectedTag = (state: RootState): string => {
    return state.posts.tags.currentItem;
};
