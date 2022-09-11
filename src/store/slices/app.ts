import { createSlice } from '@reduxjs/toolkit';

import { AppInitialStateType } from 'store/types';

const initialState: AppInitialStateType = {
    isInitialized: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: {},
});

export default appSlice.reducer;
