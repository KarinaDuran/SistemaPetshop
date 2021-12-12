import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterForm from './pages/RegisterForm/RegisterForm';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route component={Dashboard} path="/dashboard" />
        <Route component={RegisterForm} path="/cadastro" />
        <Route component={LoginPage} path="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
