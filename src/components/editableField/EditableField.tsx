import React, { ChangeEvent, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';

import classes from './EditableField.module.scss';
import { EditableFieldType } from './types';

import { useAppDispatch, useAppSelector } from 'hooks';
import { selectAuthUserId } from 'store/selectors';
import { setAppError } from 'store/slices';
import { removeComment, updateComment } from 'store/thunks';
import { ReturnComponentType } from 'types';
import { formatDate } from 'utils';

export const EditableField = ({
    createdAt,
    userId,
    text,
    commentId,
    fullName,
}: EditableFieldType): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { id: postId } = useParams();

    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(text);

    const authUserId = useAppSelector(selectAuthUserId);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    };

    const update = (): void => {
        if (value.length >= 3) {
            dispatch(updateComment({ commentId, text: value }));
            setEditMode(false);

            return;
        }

        dispatch(setAppError('Please enter min 3 symbols'));
    };

    const deleteComment = (commentId: string): void => {
        dispatch(removeComment(commentId));
    };

    return (
        <>
            {editMode ? (
                <TextField
                    fullWidth
                    size="small"
                    value={value}
                    autoFocus
                    onChange={handleChange}
                />
            ) : (
                <>
                    <ListItemText primary={fullName} secondary={text} />
                    <div
                        style={postId ? { right: 120 } : { right: 10 }}
                        className={classes.date}
                    >
                        {formatDate(createdAt)}
                    </div>
                </>
            )}
            {authUserId === userId && postId ? (
                <>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={editMode ? update : () => setEditMode(true)}
                    >
                        {editMode ? <CheckIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={
                            editMode
                                ? () => setEditMode(false)
                                : () => deleteComment(commentId)
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ) : null}
        </>
    );
};
