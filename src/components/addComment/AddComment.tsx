import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './AddComment.module.scss';

import { ReturnComponentType } from 'types';

export const Index = (): ReturnComponentType => {
    return (
        <div className={styles.root}>
            <Avatar
                classes={{ root: styles.avatar }}
                src="https://mui.com/static/images/avatar/5.jpg"
            />
            <div className={styles.form}>
                <TextField
                    label="Написать комментарий"
                    variant="outlined"
                    maxRows={10}
                    multiline
                    fullWidth
                />
                <Button variant="contained">Отправить</Button>
            </div>
        </div>
    );
};
