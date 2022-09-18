import { instance } from 'api/config';
import { CommentType } from 'api/types';

export const commentsAPI = {
    fetchComments: () => {
        return instance.get<CommentType[]>(`/comments`);
    },
};
