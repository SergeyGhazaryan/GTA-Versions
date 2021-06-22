import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import { GTAVersionDetails } from './components/gtaVersionDetails';

import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route exact path='/gta/:id' component={GTAVersionDetails} />
      </Switch>
    </Router>
  );
};

export default App;
