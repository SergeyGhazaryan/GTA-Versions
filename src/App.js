import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import GtaVersionInfo from './components/gtaVersionInfo';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route exact path='/gta/:id' component={GtaVersionInfo} />
      </Switch>
    </Router>
  );
};

export default App;
