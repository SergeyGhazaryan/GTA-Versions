import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import { GTAVersionDetails } from './components/gtaVersionDetails';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { PrivateRoute } from './components/privateRoute';
import { EditUser } from './components/editUser';
import { ChangePassword } from './components/changePassword';
import { Header } from './components/header';

import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/me/edit'>
          <EditUser />
        </PrivateRoute>
        <PrivateRoute exact path='/me/change/password'>
          <ChangePassword />
        </PrivateRoute>
        <PrivateRoute exact path='/'>
          <Layout />
        </PrivateRoute>
        <PrivateRoute exact path='/gta/:id'>
          <GTAVersionDetails />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
