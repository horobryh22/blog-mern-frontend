import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged } from 'store/selectors';
import { changeSelectedTag, logout } from 'store/slices';
import { ReturnComponentType } from 'types';

export const Header = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isUserLogged = useAppSelector(selectIsUserLogged);

    const onClickLogout = (): void => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    const handleClick = (): void => {
        dispatch(changeSelectedTag(''));
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <NavLink className={styles.logo} to="/" onClick={handleClick}>
                        <div>KHOROBRYKH BLOG</div>
                    </NavLink>
                    <div className={styles.buttons}>
                        {isUserLogged ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/new-post')}
                                >
                                    Create article
                                </Button>
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
