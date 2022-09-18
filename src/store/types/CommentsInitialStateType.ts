import { CommentType } from 'api/types';
import { REQUEST_STATUS } from 'enums';

export type CommentsInitialStateType = {
    items: CommentType[];
    selectedItems: CommentType[];
    status: REQUEST_STATUS;
};
