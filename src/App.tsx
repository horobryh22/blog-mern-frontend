import React from 'react';

import './App.css';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header, SimpleBackdrop } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppSelector } from 'hooks';
import { AddPost, FullPost, Home, Login, Registration } from 'pages';
import { selectAppStatus } from 'store/selectors';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
    const isLoading = useAppSelector(selectAppStatus);

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
