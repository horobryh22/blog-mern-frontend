import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';

import { ReturnComponentType } from 'types';

export const Header = (): ReturnComponentType => {
    const isAuth = true;

    const onClickLogout = (): void => {};

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <a className={styles.logo} href="/">
                        <div>KHOROBRYKH BLOG</div>
                    </a>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <a href="/posts/create">
                                    <Button variant="contained">Create article</Button>
                                </a>
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
                                <a href="/login">
                                    <Button variant="outlined">Log In</Button>
                                </a>
                                <a href="/register">
                                    <Button variant="contained">Create account</Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
