import { createAsyncThunk } from '@reduxjs/toolkit';

import { postsAPI } from 'api';

export const fetchTags = createAsyncThunk<string[], void, { rejectValue: string }>(
    'posts/fetchTags',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postsAPI.fetchTags();

            return response.data;
        } catch (e) {
            console.log(e);

            return rejectWithValue('error');
        }
    },
);
