import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

import routes from './routes';

// pages
import MainPage from '~pages/MainPage';

export default () => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path={routes.HOME}>
          <MainPage />
        </Route>
      </Switch>
    </ScrollToTop>
  </Router>
);
