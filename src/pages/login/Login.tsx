import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './Login.module.scss';

import { ReturnComponentType } from 'types';

export const Login = (): ReturnComponentType => {
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Sign In
            </Typography>
            <TextField
                className={styles.field}
                label="Email"
                error
                helperText="Enter the correct email"
                fullWidth
            />
            <TextField className={styles.field} label="Password" fullWidth />
            <Button size="large" variant="contained" fullWidth>
                Log In
            </Button>
        </Paper>
    );
};
