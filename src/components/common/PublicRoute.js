import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from '../layout/Navbar';
// import Footer from '../layout/Footer';

const PublicRoute = ({
  component: Component,
  ...rest
}) => {

  return (
    <Route
      {...rest}
      render={ props => {
        return (
          <Fragment>
            <Navbar/>
            <div className="middle-wrapper">
              <div className="middle-content">
                <Component {...props} />
              </div>
            </div>
            {/* <Footer/> */}
          </Fragment>
        )
      }}
    />
  )
}

const mapStateToProps = state => ({
  // auth: state.auth,
  // siteConfig: state.siteConfig,
});

export default connect(mapStateToProps)(PublicRoute);