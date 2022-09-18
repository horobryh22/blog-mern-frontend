import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import {
    fetchComments,
    fetchSelectedComments,
    removeComment,
    updateComment,
} from 'store/thunks';
import { CommentsInitialStateType } from 'store/types';

const initialState: CommentsInitialStateType = {
    status: REQUEST_STATUS.IDLE,
    items: [],
    selectedItems: [],
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // get last comments
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchComments.pending, state => {
            state.items = [];
            state.status = REQUEST_STATUS.LOADING;
        });
        builder.addCase(fetchComments.rejected, state => {
            state.items = [];
            state.status = REQUEST_STATUS.ERROR;
        });
        // get selected comments
        builder.addCase(fetchSelectedComments.fulfilled, (state, action) => {
            state.selectedItems = action.payload;
            state.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchSelectedComments.pending, state => {
            state.selectedItems = [];
            state.status = REQUEST_STATUS.LOADING;
        });
        builder.addCase(fetchSelectedComments.rejected, state => {
            state.selectedItems = [];
            state.status = REQUEST_STATUS.ERROR;
        });
        // remove comment
        builder.addCase(removeComment.fulfilled, (state, action) => {
            state.selectedItems = state.selectedItems.filter(
                comment => comment._id !== action.payload,
            );
            state.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(removeComment.rejected, state => {
            state.status = REQUEST_STATUS.ERROR;
        });
        // update comment
        builder.addCase(updateComment.fulfilled, (state, action) => {
            state.selectedItems = state.selectedItems.map(comment =>
                comment._id === action.payload.commentId
                    ? { ...comment, text: action.payload.text }
                    : comment,
            );
            state.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(updateComment.rejected, state => {
            state.status = REQUEST_STATUS.ERROR;
        });
    },
});

export default commentsSlice.reducer;
