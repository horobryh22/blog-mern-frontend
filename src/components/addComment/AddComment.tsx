import React, { ChangeEvent, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './AddComment.module.scss';

import defaultAvatar from 'assets/images/defaultAvatar.jpg';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setAppError } from 'store/slices';
import { createComment } from 'store/thunks';
import { ReturnComponentType } from 'types';

export type IndexType = {
    postId: string;
};

export const Index = ({ postId }: IndexType): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState('');

    const userAvatar = useAppSelector(state => state.auth.data.avatarUrl);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.currentTarget.value);
    };

    const handleClick = (): void => {
        if (postId && text.length >= 3) {
            dispatch(createComment({ postId, text }));
            setText('');

            return;
        }

        dispatch(setAppError('Please enter min 3 symbols'));
    };

    return (
        <div className={styles.root}>
            <Avatar classes={{ root: styles.avatar }} src={userAvatar || defaultAvatar} />
            <div className={styles.form}>
                <TextField
                    label="Write a comment"
                    variant="outlined"
                    maxRows={10}
                    multiline
                    fullWidth
                    value={text}
                    onChange={handleChange}
                />
                <Button variant="contained" onClick={handleClick}>
                    Send
                </Button>
            </div>
        </div>
    );
};
