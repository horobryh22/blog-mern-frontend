import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { initializeApp } from 'store/thunks';
import { AppInitialStateType } from 'store/types';
import { Nullable } from 'types';

const initialState: AppInitialStateType = {
    isInitialized: false,
    status: REQUEST_STATUS.SUCCESS,
    error: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
            state.status = action.payload;
        },
        setAppError: (state, action: PayloadAction<Nullable<string>>) => {
            state.error = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, state => {
                state.isInitialized = true;
            })
            .addCase(initializeApp.pending, state => {
                state.isInitialized = false;
            })
            .addCase(initializeApp.rejected, state => {
                state.isInitialized = true;
            });
    },
});

export const { setAppStatus, setAppError } = appSlice.actions;
export default appSlice.reducer;
