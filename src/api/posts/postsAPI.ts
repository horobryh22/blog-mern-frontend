import { instance } from 'api/config';
import { PostType } from 'api/types';

export const postsAPI = {
    fetchPosts: () => {
        return instance.get<PostType[]>('/posts');
    },
};
