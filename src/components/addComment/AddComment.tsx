import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './AddComment.module.scss';

import { instance } from 'api/config';
import { ReturnComponentType } from 'types';

export const Index = (): ReturnComponentType => {
    const handleClick = (): void => {
        instance.post('/comments', {
            text: 'First comment',
            post: '6325fd64c0aa25fd8c5b7d94',
        });
    };

    return (
        <div className={styles.root}>
            <Avatar
                classes={{ root: styles.avatar }}
                src="https://mui.com/static/images/avatar/5.jpg"
            />
            <div className={styles.form}>
                <TextField
                    label="Write a comment"
                    variant="outlined"
                    maxRows={10}
                    multiline
                    fullWidth
                />
                <Button variant="contained" onClick={handleClick}>
                    Send
                </Button>
            </div>
        </div>
    );
};
