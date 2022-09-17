import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const uploadImage = createAsyncThunk<string, FormData, { rejectValue: string }>(
    'posts/uploadImage',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const { data } = await postsAPI.uploadImage(formData);

            return data.url;
        } catch (e) {
            const err = e as AxiosError;

            dispatch(setAppStatus(REQUEST_STATUS.ERROR));

            return rejectWithValue(err.message);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
