import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';
import { me } from 'store/thunks/auth/me';

export const initializeApp = createAsyncThunk<void, void, { rejectValue: string }>(
    'app/initializeApp',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            await dispatch(me());
        } catch (e) {
            const err = e as AxiosError;

            dispatch(setAppStatus(REQUEST_STATUS.ERROR));

            return rejectWithValue(err.message);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
