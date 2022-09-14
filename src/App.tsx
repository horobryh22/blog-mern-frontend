import React, { useEffect } from 'react';

import './App.css';
import { CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header, SimpleBackdrop } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AddPost, FullPost, Home, Login, Registration } from 'pages';
import { selectAppStatus, selectIsInitialized } from 'store/selectors';
import { initializeApp } from 'store/thunks';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const isAppInitialized = useAppSelector(selectIsInitialized);
    const isLoading = useAppSelector(selectAppStatus);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (!isAppInitialized) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '47.5%',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <SimpleBackdrop open={isLoading === REQUEST_STATUS.LOADING} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-post" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
