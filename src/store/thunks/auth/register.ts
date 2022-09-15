import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { FormValuesType, UserDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const register = createAsyncThunk<
    UserDataType,
    FormValuesType,
    { rejectValue: string }
>('auth/register', async (userData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await authAPI.register(userData);

        return response.data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
