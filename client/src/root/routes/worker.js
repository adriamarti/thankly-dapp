// External Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Internal Dependencies
import Worker from '../../containers/worker'

export default () => (
  <Switch>
    <Route exact path="/worker">
      <Worker />
    </Route>
    {/* <Route exact path="/company/settings">
      <Company content="settings" />
    </Route> */}
  </Switch>
);