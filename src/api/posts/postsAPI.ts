import { instance } from 'api/config';
import { PostType } from 'api/types';

export const postsAPI = {
    fetchPosts: () => {
        return instance.get<PostType[]>('/posts');
    },
    fetchPost: (id: string) => {
        return instance.get<PostType>(`/posts/${id}`);
    },
    fetchTags: () => {
        return instance.get<string[]>('/tags');
    },
};
