import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { ReturnComponentType } from 'types';

export const Header = (): ReturnComponentType => {
    const isAuth = false;

    const onClickLogout = (): void => {};

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <NavLink className={styles.logo} to="/">
                        <div>KHOROBRYKH BLOG</div>
                    </NavLink>
                    <div className={styles.buttons}>
                        {isAuth ? (
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
