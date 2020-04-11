import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRouter from './routes/home';

const Router = () => (
  <Switch>
    <Route path="/" component={HomeRouter} />
  </Switch>
);

export default Router;