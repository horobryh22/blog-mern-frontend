import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import classes from './Registration.module.scss';

import { FormValuesType } from 'api/types';
import camera from 'assets/images/camera.svg';
import defaultAvatar from 'assets/images/defaultAvatar.jpg';
import { InputFileType } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged } from 'store/selectors';
import { register } from 'store/thunks';
import { ReturnComponentType } from 'types';
import { setValueToLocalStorage } from 'utils';

export const Registration = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const [avatarUrl, setAvatarUrl] = useState('');

    const isUserLogged = useAppSelector(selectIsUserLogged);

    const {
        handleSubmit,
        register: registration,
        formState: { errors },
    } = useForm<FormValuesType>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: FormValuesType): Promise<void> => {
        const { email, password, fullName } = values;

        const data = await dispatch(
            register({
                email,
                password,
                fullName,
                avatarUrl: avatarUrl ? `http://localhost:4444${avatarUrl}` : '',
            }),
        );

        if (data.payload) setValueToLocalStorage(data.payload);
    };

    if (isUserLogged) return <Navigate to="/" />;

    return (
        <Paper classes={{ root: classes.root }}>
            <Typography classes={{ root: classes.title }} variant="h5">
                Create account
            </Typography>
            <div className={classes.avatar}>
                <InputFileType setImageUrl={setAvatarUrl} className={classes.avatarIcon}>
                    <img src={camera} alt="camera" />
                </InputFileType>
                <Avatar
                    src={avatarUrl ? `http://localhost:4444${avatarUrl}` : defaultAvatar}
                    sx={{ width: 100, height: 100 }}
                    alt="avatar"
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...registration('fullName', {
                        required: {
                            value: true,
                            message: 'Enter your name',
                        },
                    })}
                    className={classes.field}
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
                    className={classes.field}
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
                    className={classes.field}
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
