import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { AppInitialStateType } from 'store/types';

const initialState: AppInitialStateType = {
    isInitialized: false,
    status: REQUEST_STATUS.SUCCESS,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
            state.status = action.payload;
        },
    },
    extraReducers: {},
});

export const { setAppStatus } = appSlice.actions;
export default appSlice.reducer;
