import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks';
import { isUserLogged } from 'store/selectors';
import { logout } from 'store/slices';
import { ReturnComponentType } from 'types';

export const Header = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const iseUserLogged = useAppSelector(isUserLogged);

    const onClickLogout = (): void => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <NavLink className={styles.logo} to="/">
                        <div>KHOROBRYKH BLOG</div>
                    </NavLink>
                    <div className={styles.buttons}>
                        {iseUserLogged ? (
                            <>
                                <NavLink to="/posts/create">
                                    <Button variant="contained">Create article</Button>
                                </NavLink>
                                <Button
                                    onClick={onClickLogout}
                                    variant="contained"
                                    color="error"
                                >
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login">
                                    <Button variant="outlined">Log In</Button>
                                </NavLink>
                                <NavLink to="/register">
                                    <Button variant="contained">Create account</Button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
