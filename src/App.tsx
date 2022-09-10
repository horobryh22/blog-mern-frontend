import React from 'react';

import './App.css';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header } from 'components';
import { AddPost, FullPost, Home, Login, Registration } from 'pages';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
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
