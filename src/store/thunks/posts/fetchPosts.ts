import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { PostType } from 'api/types';

export const fetchPosts = createAsyncThunk<PostType[], void, { rejectValue: string }>(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postsAPI.fetchPosts();

            return response.data;
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.message);
        }
    },
);
