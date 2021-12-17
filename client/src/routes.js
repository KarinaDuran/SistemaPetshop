import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from './theme';

const theme = createTheme(themeDefault);

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* <PrivateRoute path="/Agendamento" component={UserPage} /> */}
          <Route component={UserPage} path="/Agendamento" />
          <Route component={Dashboard} path="/dashboard" />
          <Route component={RegisterForm} path="/cadastro" />
          <Route component={LoginPage} path="/login" />
          <Route component={Home} path="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Routes;
