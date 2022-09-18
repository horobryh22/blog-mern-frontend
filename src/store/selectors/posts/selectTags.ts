import { RootState } from 'store/store';

export const selectTags = (state: RootState): string[] => {
    return state.posts.tags.items;
};
