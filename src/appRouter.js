import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';

import PageNotFound from './modules/404';
import LoginPage from './modules/login/Login';
import Page from './modules/page';
import RegisterPage from './modules/register/Register';

const AppRouter = (props) => (
  <div className="fullHeight">
    <Router history={props.history}>
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/home/*" component={Page} />
        <Route exact path="/" component={LoginPage} />
        <Route path="/**" component={PageNotFound} />
      </Switch>
    </Router>
  </div>
);

export default AppRouter;
