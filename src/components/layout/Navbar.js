import React, { useState, useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link';

import { connect } from 'react-redux';

import {
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavLink,
  CDropdown,
  CForm,
  CButton,
  CContainer,
  CNavbarToggler,
  CNavItem,
  CDropdownDivider,
  CFormControl
} from '@coreui/react'

import PropTypes from 'prop-types'

const Navbar = ({ 
  siteConfig
 }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
  }, []);

  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <Link to="/"><CNavbarBrand className="fw-6"><i className="fas fa-hamburger fs-25 mr-1"></i>{siteConfig.siteName}</CNavbarBrand></Link>
          
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#" active>Home</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">My Profile</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Following</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Followers</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Settings</CNavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}

Navbar.propTypes = {
}

const mapStateToProps = state => ({
  siteConfig: state.siteConfig
});

export default connect(mapStateToProps, {  })(Navbar);