import { instance } from 'api/config';
import { PostDataType, PostType } from 'api/types';

export const postsAPI = {
    fetchPosts: () => {
        return instance.get<{ posts: PostType[]; postsTotalCount: number }>('/posts');
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
        return instance.patch<PostType>(`/posts/${id}`, postData);
    },
    uploadImage: (formData: FormData) => {
        return instance.post<{ url: string }>('/upload', formData);
    },
};
