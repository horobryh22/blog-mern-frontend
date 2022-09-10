import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';

import 'index.scss';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { theme } from 'themes/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);
