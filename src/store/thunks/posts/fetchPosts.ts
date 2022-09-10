import { createAsyncThunk } from '@reduxjs/toolkit';

import { postsAPI } from 'api';
import { PostType } from 'api/types';

export const fetchPosts = createAsyncThunk<PostType[], void, { rejectValue: string }>(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postsAPI.fetchPosts();

            console.log(response);

            return response.data;
        } catch (e) {
            console.log(e);

            return rejectWithValue('error');
        }
    },
);
