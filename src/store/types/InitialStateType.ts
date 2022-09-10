import { PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';

type EntityType<T> = {
    items: T[];
    status: REQUEST_STATUS;
};

export type PostsInitialStateType = {
    posts: EntityType<PostType>;
    comments: EntityType<any>;
    tags: EntityType<any>;
};
