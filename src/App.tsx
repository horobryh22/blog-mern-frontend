import React from 'react';

import './App.css';
import Container from '@mui/material/Container';

import { Header } from 'components';
import { Home } from 'pages';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Home />
                {/* <FullPost /> */}
                {/* <AddPost /> */}
                {/* <Login /> */}
                {/* <Registration /> */}
            </Container>
        </>
    );
};

export default App;
