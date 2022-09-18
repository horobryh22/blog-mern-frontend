import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { commentsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const updateComment = createAsyncThunk<
    { commentId: string; text: string },
    { commentId: string; text: string },
    { rejectValue: string }
>(
    'comments/updateComment',
    async ({ commentId, text }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));

            await commentsAPI.update(text, commentId);

            return { commentId, text };
        } catch (e) {
            const err = e as AxiosError;

            dispatch(setAppStatus(REQUEST_STATUS.ERROR));

            return rejectWithValue(err.message);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
