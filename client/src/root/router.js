import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRouter from './routes/home';
import CompanyRouter from './routes/company';
import WorkerRouter from './routes/worker';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomeRouter} />
    <Route path="/company" component={CompanyRouter} />
    <Route path="/worker" component={WorkerRouter} />
  </Switch>
);

export default Router;