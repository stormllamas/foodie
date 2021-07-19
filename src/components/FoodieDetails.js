import React, { useState, useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link';

import { connect } from 'react-redux';

import {
  CRow,
  CContainer,
  CCol,
  CSpinner,

  CCard,
  CCardBody,

  CFormLabel,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CFormFeedback
} from '@coreui/react'

import PropTypes from 'prop-types'

import { getFoodie, updateFoodie } from '../actions/foodieActions'

const FoodieDetails = ({ 
  foodies: { foodiesLoading, foodie },
  getFoodie,
  updateFoodie,
  match
 }) => {

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const onNameBlur = () => {
    if (name === foodie.name) {
      console.log('same')
    } else if (name) {
      console.log('good')
      updateFoodie({
        id: foodie.id,
        name
      })
    } else {
      console.log('false')
    }
  }

  const onDescriptionBlur = () => {
    if (description === foodie.description) {
      console.log('same')
    } else if (description) {
      console.log('good')
      updateFoodie({
        id: foodie.id,
        description
      })
    } else {
      console.log('false')
    }
  }

  useEffect(() => {
    getFoodie({ id: match.params.foodie_id})
  }, []);

  useEffect(() => {
    if (foodie) {
      setName(foodie.name)
      setDescription(foodie.description)
    }
  }, [foodie]);

  return (
    <>
      <section className="section-foodie-details pb-5">
        {foodiesLoading ? (
          <div className="loader preloader-wrapper flex-col align-items-center justify-content-center">
            <CSpinner color="light"/>
          </div>
        ) : undefined}
        {foodie ? (
          foodie.id === match.params.foodie_id && (
            <CContainer>
              <CRow className="mt-4">
                <CCol className="flex-row justify-content-between">
                  <Link to="/" className="fw-7"><i className="fas fa-arrow-left text-grey mr-1"></i> Go back</Link>
                </CCol>
              </CRow>
              <CRow className="align-items-start mt-3">
                <CCol xs={12} sm={12} md={10} lg={8}>
                  <CCard style={{ width: '100%' }}>
                    <CCardBody>
                      <div className="mb-3">
                        <CFormLabel htmlFor="name">Name</CFormLabel>
                        <CFormControl
                          type="text"
                          id="name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          onBlur={onNameBlur}
                          placeholder="e.g. DadBod Burger, JT Wings"
                          disabled={foodiesLoading}
                        />
                        <CFormFeedback invalid>Please name your foodie.</CFormFeedback>
                      </div>
                      <div className="bg-cover primary-overlay mb-3 p-0" style={{ backgroundImage: (foodie.image ? `url("${foodie.image.downloadUrl}")` : `url("https://source.unsplash.com/1600x900/?${foodie.name}")`), width: '250px', height: '180px' }}>
                        <div className="overlay-content active-on-mobile pt-5 text-center" style={{ height: '180px', cursor: 'pointer'}}>
                          <i className="fas fa-camera text-white fa-3x"></i>
                          <p className="text-white">Change Photo</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <CInputGroup>
                          <CInputGroupText><i className='fas fa-thumbs-up mr-1'></i> Likes</CInputGroupText>
                          <CFormControl
                            type="text"
                            id="likes"
                            defaultValue={foodie.likes}
                            disabled
                          />
                        </CInputGroup>
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="description">Description</CFormLabel>
                        <CFormControl
                          component="textarea"
                          id="description"
                          rows="6"
                          required
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          onBlur={onDescriptionBlur}
                          disabled={foodiesLoading}
                        ></CFormControl>
                        <CFormFeedback invalid>Please provide a description.</CFormFeedback>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          )
        ) : (
          <CCol className="align-items-center justify-content-center flex-col" style={{ height: '60vh'}}>
            <i className="fas fa-hamburger fa-3x"></i>
            <h4>No Foodie Found</h4>
          </CCol>
        )}
      </section>
    </>
  )
}

FoodieDetails.propTypes = {
  getFoodie: PropTypes.func.isRequired,
  updateFoodie: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  foodies: state.foodies
});

export default connect(mapStateToProps, { getFoodie, updateFoodie })(FoodieDetails);