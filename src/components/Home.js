import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux';

import {
  CRow,
  CContainer,
  CCol
} from '@coreui/react'

import PropTypes from 'prop-types'

const Home = ({  }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="docs-example-row docs-example-row-flex-cols">
        <CContainer>
          <CRow className="align-items-start">
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
          </CRow>
          <CRow className="align-items-center">
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
          </CRow>
          <CRow className="align-items-end">
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
            <CCol>One of three columns</CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

Home.propTypes = {
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {  })(Home);