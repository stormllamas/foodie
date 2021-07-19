import React, { useState, useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link';

import { connect } from 'react-redux';

import {
  CRow,
  CContainer,
  CCol,
  CSpinner,
  CButton,

  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,

  CForm,
  CFormLabel,
  CFormControl,
  CFormFeedback
} from '@coreui/react'

import PropTypes from 'prop-types'

import { getFoodies, addFoodie, updateLike, deleteFoodie } from '../actions/foodieActions'

const Home = ({ 
  foodies: { foodiesLoading, foodies },
  getFoodies,
  addFoodie,
  updateLike,
  deleteFoodie
 }) => {
  const [visible, setVisible] = useState(false)
  const [liked, setLiked] = useState([])

  const [validated, setValidated] = useState(false)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')


  const onSubmit = e => {
    const form = e.currentTarget
    e.preventDefault()
    setValidated(true)
    if (name && image && document.getElementById('image').value && description) {
      setVisible(false)
      addFoodie({ name, description })
    }
  }

  const openFile = (file) => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = () => {
      let dataURL = reader.result;
      let output = document.getElementById('output');
      console.log(output)
      output.style.backgroundImage = `url("${dataURL}")`;
    };
    reader.readAsDataURL(input.files[0])
  };

  useEffect(() => {
    getFoodies()
  }, []);

  return (
    <>
      <section className="section-home pb-5">
        {foodiesLoading && (
          <div className="loader preloader-wrapper flex-col align-items-center justify-content-center">
            <CSpinner color="light"/>
          </div>
        )}
        <CContainer>
          <CRow className="pt-4">
            <CCol className="flex-row justify-content-between">
              <h4>Feed</h4>
              <div className="text-end">
                <CButton className="text-center btn text-white btn-success" onClick={() => setVisible(true)}><i className="fas fa-plus mr-1"></i> Add a foodie</CButton>
              </div>
            </CCol>
          </CRow>
          <CRow className="align-items-start pt-4">
            {!foodiesLoading && (
              foodies !== null && foodies.length > 0 ? (
                foodies.map(foodie => (
                  <CCol key={foodie.id} xs={6} sm={6} md={4} lg={3}>
                    <div className="card mb-4" style={{width:"100%"}}>
                      <div className="docs-placeholder-img card-img-top foodie-card-img" style={{ height:"150px"}}>
                        <a className="bg-cover primary-overlay" style={{ backgroundImage: (foodie.image ? `url("${foodie.image.downloadUrl}")` : `url("https://source.unsplash.com/1600x900/?${foodie.name}")`), width: '100%', height: '180px' }}>
                          <div className="overlay-content pt-4 pr-4 text-end">
                            <i className="fas fa-trash-alt text-red fa-1x" onClick={() => deleteFoodie({ id: foodie.id })} style={{ cursor: 'pointer'}}></i>
                          </div>
                        </a>
                      </div>
                      <div className="card-body">
                        <Link to={`/foodie/${foodie.id}`} className="small fw-6">{"> See Details"}</Link>
                        <div className="mb-1 mt-1">
                          <a style={{cursor: 'pointer'}}>
                            <i className={`${liked.includes(foodie.id) ? 'text-info fas': 'far'} fa-thumbs-up`} onClick={() => {
                              if (liked.includes(foodie.id)) {
                                setLiked(liked.filter(i => i !== foodie.id))
                                updateLike({ id: foodie.id, likes: foodie.likes-1})
                              } else {
                                setLiked([...liked, foodie.id])
                                updateLike({ id: foodie.id, likes: foodie.likes+1})
                              }
                            }}>
                            </i>
                          </a>
                          <strong className="small ml-1">{foodie.likes} likes</strong>
                        </div>
                        <h5 className="card-title">{foodie.name}</h5>
                        <p className="card-text">{foodie.description.substring(0,55)}{foodie.description.length > 55 && '...'}</p>
                        {/* <a href="#" className="btn text-white btn-success">Go somewhere</a> */}
                      </div>
                    </div>
                  </CCol>
                ))
              ) : (
                <CCol className="align-items-center justify-content-center flex-col" style={{ height: '60vh'}}>
                  <i className="fas fa-hamburger fa-3x"></i>
                  <h4>No Foodies Available</h4>
                </CCol>
              )
            )}
          </CRow>
        </CContainer>
        <CModal visible={visible} onDismiss={() => setVisible(false)}>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={onSubmit}
          >
            <CModalHeader onDismiss={() => setVisible(false)}>
              <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormControl
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. DadBod Burger, JT Wings"
                  required
                />
                <CFormFeedback invalid>Please name your foodie.</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="image">Image</CFormLabel>
                <CFormControl
                  type="file"
                  id="image"
                  required
                  onChange={e => {
                    setImage(e.target.value)
                    openFile(e)
                  }}
                />
                <CFormFeedback invalid>Please provide an image.</CFormFeedback>
                <a id='output' href="#" className="image-field bg-cover mt-4 pt-5 rad-2" >
                  <p className="mt-2">Your Image</p>
                  {/* <img id='output' className="rad-2"/> */}
                </a>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">
                  Description
                </CFormLabel>
                <CFormControl
                  component="textarea"
                  id="description"
                  rows="3"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></CFormControl>
                <CFormFeedback invalid>Please provide a description.</CFormFeedback>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" variant="ghost" onClick={() => setVisible(false)}>
                Cancel
              </CButton>
              <CButton color="success text-white" type="submit">Submit</CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </section>
    </>
  )
}

Home.propTypes = {
  getFoodies: PropTypes.func.isRequired,
  addFoodie: PropTypes.func.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteFoodie: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  foodies: state.foodies
});

export default connect(mapStateToProps, { getFoodies, addFoodie, updateLike, deleteFoodie })(Home);