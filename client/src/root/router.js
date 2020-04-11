import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRouter from './routes/home';
import CompanyRouter from './routes/company';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomeRouter} />
    <Route exact path="/company" component={CompanyRouter} />
  </Switch>
);

export default Router;