import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';
import { AppDispatch } from 'store/store';
import { fetchComments, fetchTags } from 'store/thunks';

export const deletePost = createAsyncThunk<
    string,
    string,
    { rejectValue: string; dispatch: AppDispatch }
>('posts/deletePost', async (id, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        await postsAPI.deletePost(id);

        await dispatch(fetchTags());
        await dispatch(fetchComments());

        return id;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
