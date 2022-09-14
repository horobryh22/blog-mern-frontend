import { createSlice } from '@reduxjs/toolkit';

import { PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { fetchOnePost, fetchPosts, fetchTags } from 'store/thunks';
import { PostsInitialStateType } from 'store/types';

const initialState: PostsInitialStateType = {
    posts: {
        items: [],
        currentItem: {} as PostType,
        status: REQUEST_STATUS.IDLE,
    },
    comments: {
        items: [],
        status: REQUEST_STATUS.IDLE,
    },
    tags: {
        items: [],
        status: REQUEST_STATUS.IDLE,
    },
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchPosts.pending, state => {
            state.posts.status = REQUEST_STATUS.LOADING;
            state.posts.items = [];
        });
        builder.addCase(fetchPosts.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
            state.posts.items = [];
        });
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
        builder.addCase(fetchOnePost.fulfilled, (state, action) => {
            console.log('fullfield');
            state.posts.currentItem = action.payload;
            state.posts.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchOnePost.pending, state => {
            console.log('loading');
            state.posts.status = REQUEST_STATUS.LOADING;
            state.posts.currentItem = {} as PostType;
        });
        builder.addCase(fetchOnePost.rejected, state => {
            state.posts.status = REQUEST_STATUS.ERROR;
            state.posts.currentItem = {} as PostType;
        });
    },
});

export default postsSlice.reducer;
