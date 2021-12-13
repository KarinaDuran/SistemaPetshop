import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from './theme';

const theme = createTheme(themeDefault);

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route component={Dashboard} path="/dashboard" />
          <Route component={RegisterForm} path="/cadastro" />
          <Route component={LoginPage} path="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Routes;
