import { ThemeProvider } from '@mui/material';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './configs/theme';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import App from './App';
import './assets/css/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App>
      <Suspense fallback={<div>loading..</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </App>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
