import { instance } from 'api/config';
import { CommentType } from 'api/types';

export const commentsAPI = {
    fetchComments: () => {
        return instance.get<CommentType[]>(`/comments`);
    },
    fetchSelectedComments: (postId: string) => {
        return instance.get<CommentType[]>(`/comments/${postId}`);
    },
    create: (text: string, postId: string) => {
        return instance.post<Omit<CommentType, 'user'>>(`/comments`, {
            text,
            post: postId,
        });
    },
    update: (text: string, commentId: string) => {
        return instance.patch(`/comments/${commentId}`, { text });
    },
    remove: (commentId: string) => {
        return instance.delete(`/comments/${commentId}`);
    },
};
