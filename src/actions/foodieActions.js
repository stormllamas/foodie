import {
  LOAD_FOODIES,
  GET_FOODIES, GET_FOODIES_ERROR,
  GET_FOODIE, GET_FOODIE_ERROR,
  ADD_FOODIE, ADD_FOODIE_ERROR,
  UPDATE_FOODIE, UPDATE_FOODIE_ERROR,
  UPDATE_LIKE, UPDATE_LIKE_ERROR,
  DELETE_FOODIE, DELETE_FOODIE_ERROR
} from './types';

import { GraphQLClient, request, gql } from 'graphql-request'

const endpoint = 'https://api.8base.com/ckr94su8y005105mg5w4af19k'

export const getFoodies = () => async dispatch => {
  dispatch({ type: LOAD_FOODIES });
  try {

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      {
        foodiesList(first: 10, sort: { likes: DESC }) {
          items {
            id
            name
            description
            likes
            image {
              downloadUrl
            }
          }
        }
      }
    `
    const res = await graphQLClient.request(query)

    dispatch({
      type: GET_FOODIES,
      payload: res.foodiesList.items
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_FOODIES_ERROR
    });
  }
}

export const getFoodie = ({ id }) => async dispatch => {
  dispatch({ type: LOAD_FOODIES });
  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      {
        foodie(id: "${id}") {
          id
          name
          description
          likes
          image {
            downloadUrl
          }
        }
      }
    `
    const res = await graphQLClient.request(query)

    dispatch({
      type: GET_FOODIE,
      payload: res.foodie
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_FOODIE_ERROR
    });
  }
}

export const addFoodie = ({ name, description }) => async dispatch => {
  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      mutation {
        foodieCreate(
          data: {
            user: {
              connect: {
                id: "ckr94t27o00b405mg280vfw6z"
              }
            },
            name: "${name}",
            description: "${description}",
        }) {
          id
          name
          description
          likes
          image {
            downloadUrl
          }
        }
      }
    `

    const res = await graphQLClient.request(query)

    dispatch({
      type: ADD_FOODIE,
      payload: res.foodieCreate
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ADD_FOODIE_ERROR
    });
  }
}

export const updateFoodie = ({ id, name, description, likes, noLoad }) => async dispatch => {
  if(!noLoad) dispatch({ type: LOAD_FOODIES });
  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      mutation {
        foodieUpdate(
          filter: {id: "${id}"},
          data: {
            ${name ? `name: "${name}"` : ''}
            ${description ? `description: "${description}"` : ''}
            ${likes ? `likes: ${likes}` : ''}
          }
        ) {
          id
          name
          description
          likes
          image {
            downloadUrl
          }
        }
      }
    `
    const res = await graphQLClient.request(query)

    dispatch({
      type: UPDATE_FOODIE,
      payload: res.foodieUpdate
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: UPDATE_FOODIE_ERROR
    });
  }
}

export const updateLike = ({ id, likes }) => async dispatch => {
  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      mutation {
        foodieUpdate(
          filter: {id: "${id}"},
          data: {
            ${likes ? `likes: ${likes}` : ''}
          }
        ) {
          id
          name
          description
          likes
          image {
            downloadUrl
          }
        }
      }
    `
    const res = await graphQLClient.request(query)

    dispatch({
      type: UPDATE_LIKE,
      payload: res.foodieUpdate
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: UPDATE_LIKE_ERROR
    });
  }
}

export const deleteFoodie = ({ id }) => async dispatch => {
  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer eec9d7ce-0aec-40c2-87b2-666013a8cb2a',
      },
    })
    const query = `
      mutation {
        foodieDelete(data: {id: "${id}"}) {
          success
        }
      }
    `
    const res = await graphQLClient.request(query)

    dispatch({
      type: DELETE_FOODIE,
      payload: id
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: DELETE_FOODIE_ERROR
    });
  }
}
