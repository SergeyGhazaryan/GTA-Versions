import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import { SelectedVersion } from './components/selectedVersion';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route exact path='/gta/:id' component={SelectedVersion} />
      </Switch>
    </Router>
  );
};

export default App;
