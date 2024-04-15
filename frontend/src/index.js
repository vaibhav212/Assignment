// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DataList from './components/DataList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<StyledEngineProvider injectFirst>
  <BrowserRouter>
    <Routes>
        <Route index element={<Login />} />
        <Route path="DataList" element={<DataList />} />
    </Routes>
  </BrowserRouter>
</StyledEngineProvider>
);

//<Route path="DataList" element={<DataList accessToken={localStorage.getItem('accessToken')} />} />