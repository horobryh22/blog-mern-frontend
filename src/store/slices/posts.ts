import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import {
    fetchOnePost,
    fetchPosts,
    fetchTags,
    deletePost,
    createComment,
} from 'store/thunks';
import { PostsInitialStateType } from 'store/types';

const initialState: PostsInitialStateType = {
    posts: {
        items: [],
        currentItem: {} as PostType,
        status: REQUEST_STATUS.IDLE,
        totalCount: 0,
        sortBy: 'createdAt',
    },
    tags: {
        items: [],
        currentItem: '',
        status: REQUEST_STATUS.IDLE,
    },
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        changeSortBy: (state, action: PayloadAction<string>) => {
            state.posts.sortBy = action.payload;
        },
        changeSelectedTag: (state, action: PayloadAction<string>) => {
            state.tags.currentItem = action.payload;
        },
    },
    extraReducers: builder => {
        // get all posts
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload.posts;
            state.posts.status = REQUEST_STATUS.SUCCESS;
            state.posts.totalCount = action.payload.postsTotalCount;
        });
        builder.addCase(fetchPosts.pending, state => {
            state.posts.status = REQUEST_STATUS.LOADING;
            state.posts.items = [];
        });
        builder.addCase(fetchPosts.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
            state.posts.items = [];
        });
        // get tags
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchTags.pending, state => {
            state.tags.status = REQUEST_STATUS.LOADING;
            state.tags.items = [];
        });
        builder.addCase(fetchTags.rejected, state => {
            state.tags.status = REQUEST_STATUS.ERROR;
            state.tags.items = [];
        });
        // get one post
        builder.addCase(fetchOnePost.fulfilled, (state, action) => {
            state.posts.currentItem = action.payload;
            state.posts.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchOnePost.pending, state => {
            state.posts.status = REQUEST_STATUS.LOADING;
            state.posts.currentItem = {} as PostType;
        });
        builder.addCase(fetchOnePost.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
            state.posts.currentItem = {} as PostType;
        });
        // delete post
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts.items = state.posts.items.filter(
                post => post._id !== action.payload,
            );
            state.posts.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(deletePost.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
        });
        // increase commentsCount
        builder.addCase(createComment.fulfilled, state => {
            state.posts.currentItem.commentsCount += 1;
            state.posts.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(createComment.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
        });
    },
});

export const { changeSortBy, changeSelectedTag } = postsSlice.actions;
export default postsSlice.reducer;
