import React, { useEffect, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import {Helmet} from "react-helmet";
import Navbar from './components/layout/Navbar'
import Home from './components/Home'


import PublicRoute from './components/common/PublicRoute';

const App = () => {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/@coreui/coreui/dist/css/coreui.min.css"/>
        <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.bundle.min.js"></script>
      </Helmet>
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
