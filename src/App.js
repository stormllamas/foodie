import React, { useEffect, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import { Helmet } from "react-helmet";
import './static/dist/css/main.css'
import Home from './components/Home'
import FoodieDetails from './components/FoodieDetails'


import PublicRoute from './components/common/PublicRoute';

const App = () => {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/@coreui/coreui/dist/css/coreui.min.css"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
        <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.bundle.min.js"></script>
      </Helmet>
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/foodie/:foodie_id" component={FoodieDetails} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
