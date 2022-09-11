import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { fetchPosts, fetchTags } from 'store/thunks';
import { PostsInitialStateType } from 'store/types';

const initialState: PostsInitialStateType = {
    posts: {
        items: [],
        status: REQUEST_STATUS.SUCCESS,
    },
    comments: {
        items: [],
        status: REQUEST_STATUS.SUCCESS,
    },
    tags: {
        items: [],
        status: REQUEST_STATUS.SUCCESS,
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
            state.posts.items = [];
        });
        builder.addCase(fetchTags.rejected, state => {
            state.tags.status = REQUEST_STATUS.ERROR;
            state.posts.items = [];
        });
    },
});

export default postsSlice.reducer;
