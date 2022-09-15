import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { FormValuesType } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged } from 'store/selectors';
import { login } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Login = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Omit<FormValuesType, 'fullName'>>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const isUserLogged = useAppSelector(selectIsUserLogged);

    const onSubmit = async ({
        email,
        password,
    }: Omit<FormValuesType, 'fullName'>): Promise<void> => {
        const data = await dispatch(login({ email, password }));

        if (!data.payload) return;

        if (typeof data.payload === 'string') return;

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token!);
        }
    };

    if (isUserLogged) return <Navigate to="/" />;

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'This field is required',
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Incorrect format of email',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={styles.field}
                            label="Email"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'This field is required',
                        },
                        minLength: {
                            value: 5,
                            message: 'Password should be min 5 symbols',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={styles.field}
                            type="password"
                            label="Password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            fullWidth
                        />
                    )}
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Log In
                </Button>
            </form>
        </Paper>
    );
};
