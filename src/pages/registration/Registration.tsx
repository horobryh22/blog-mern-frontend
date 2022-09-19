import React, { ChangeEvent, useRef, useState } from 'react';

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
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged } from 'store/selectors';
import { setAppError } from 'store/slices';
import { register, uploadImage } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Registration = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const [avatarUrl, setAvatarUrl] = useState('');
    const inputFileRef = useRef<HTMLInputElement | null>(null);

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

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        try {
            if (e.target.files) {
                const formData = new FormData();
                const file = e.target.files[0];

                formData.append('image', file);
                const { payload } = await dispatch(uploadImage(formData));

                if (payload) setAvatarUrl(payload);
            }
        } catch (e) {
            dispatch(setAppError('File was not uploaded'));
        }
    };

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

        if (!data.payload) return;

        if (typeof data.payload === 'string') return;

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token!);
        }
    };

    if (isUserLogged) return <Navigate to="/" />;

    return (
        <Paper classes={{ root: classes.root }}>
            <Typography classes={{ root: classes.title }} variant="h5">
                Create account
            </Typography>
            <div className={classes.avatar}>
                <button
                    type="button"
                    className={classes.avatarIcon}
                    onClick={() => inputFileRef.current?.click()}
                >
                    <img src={camera} alt="camera" />
                </button>
                <input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                />
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
