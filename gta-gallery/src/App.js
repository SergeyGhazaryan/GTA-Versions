import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import { GTAVersionDetails } from './components/gtaVersionDetails';
import { Login } from './components/login';
import { PrivateRoute } from './components/privateRoute';

import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
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
