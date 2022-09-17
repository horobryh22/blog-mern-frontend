import { instance } from 'api/config';
import { PostDataType, PostType } from 'api/types';

export const postsAPI = {
    fetchPosts: (sort: string) => {
        return instance.get<{ posts: PostType[]; postsTotalCount: number }>(`/posts`, {
            headers: { sort },
        });
    },
    fetchOnePost: (id: string) => {
        return instance.get<PostType>(`/posts/${id}`);
    },
    fetchTags: () => {
        return instance.get<string[]>('/tags');
    },
    deletePost: (id: string) => {
        return instance.delete(`/posts/${id}`);
    },
    createPost: (postData: PostDataType) => {
        return instance.post<PostType>(`/posts`, postData);
    },
    updatePost: (postData: PostDataType, id: string) => {
        return instance.patch<PostType>(`/posdts/${id}`, postData);
    },
    uploadImage: (formData: FormData) => {
        return instance.post<{ url: string }>('/upload', formData);
    },
};
