import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import VersionInformation from './VersionInformation';

import './Styles/styles.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/gta/:id' component={VersionInformation} />
        <Route path='/' component={Layout} />
      </Switch>
    </Router>
  );
};

export default App;
