import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import styles from './Registration.module.scss';

import { FormValuesType } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { isUserLogged } from 'store/selectors';
import { register } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Registration = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const isLogged = useAppSelector(isUserLogged);

    const {
        handleSubmit,
        register: registration,
        formState: { errors },
    } = useForm<FormValuesType>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (values: FormValuesType): void => {
        dispatch(register(values));
    };

    if (isLogged) return <Navigate to="/" />;

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...registration('fullName', {
                        required: {
                            value: true,
                            message: 'Enter your name',
                        },
                    })}
                    className={styles.field}
                    label="Name"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    fullWidth
                />
                <TextField
                    {...registration('email', {
                        required: {
                            value: true,
                            message: 'This field is required',
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Incorrect format of email',
                        },
                    })}
                    className={styles.field}
                    label="Email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <TextField
                    {...registration('password', {
                        required: {
                            value: true,
                            message: 'This field is required',
                        },
                        minLength: {
                            value: 5,
                            message: 'Password should be min 5 symbols',
                        },
                    })}
                    className={styles.field}
                    label="Password"
                    type="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Sign Up
                </Button>
            </form>
        </Paper>
    );
};
