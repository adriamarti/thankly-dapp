// External Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Internal Dependencies
import Home from '../../containers/home'

export default () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
  </Switch>
);