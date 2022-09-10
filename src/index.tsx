import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';

import 'index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { store } from 'store';
import { theme } from 'themes/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
        ,
    </Provider>,
);
