import React, { Fragment, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from '../layout/Navbar';
// import Footer from '../layout/Footer';
// import SiteMessage from '../layout/SiteMessage';

const PublicRoute = ({
  component: Component,
  // auth: { userLoading, },
  // siteConfig: { siteInfoLoading, siteInfo },
  ...rest
}) => {

  const [curLocation, setCurLocation] = useState('')

  // useEffect(() => {
  //   if (!userLoading && !siteInfoLoading ) {
  //     $('.loader').fadeOut();
  //     $('.middle-content').fadeIn();
  //   } else {
  //     $('.loader').show();
  //     $('.middle-content').hide();
  //   }
  // }, [userLoading, siteInfoLoading])
  
  return (
    <Route
      {...rest}
      render={ props => {
        // if (userLoading || siteInfoLoading) {
        //   return <Navbar curLocation={curLocation}/>
        // } else {
        //   if (siteInfo.maintenance_mode) {
        //     return <Redirect to='/page404' />
        //   } else {
        //     return (
        //       <Fragment>
        //         {/* <SiteMessage/> */}
        //         <Navbar curLocation={curLocation}/>
        //         <div className="middle-wrapper">
        //           <div className="middle-content">
        //             <Component {...props} setCurLocation={setCurLocation} />
        //           </div>
        //         </div>
        //         {/* <Footer/> */}
        //       </Fragment>
        //     )
        //   }
        // }
        
        return (
          <Fragment>
            {/* <SiteMessage/> */}
            <Navbar curLocation={curLocation}/>
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