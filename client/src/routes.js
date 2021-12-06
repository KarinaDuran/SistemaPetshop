import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={LoginPage} path="/" />
    </BrowserRouter>
  );
};

export default Routes;
