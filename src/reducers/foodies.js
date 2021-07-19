import {
  LOAD_FOODIES,
  GET_FOODIES, GET_FOODIES_ERROR,
  GET_FOODIE, GET_FOODIE_ERROR,
  ADD_FOODIE, ADD_FOODIE_ERROR,
  UPDATE_FOODIE, UPDATE_FOODIE_ERROR,
  UPDATE_LIKE, UPDATE_LIKE_ERROR,
  DELETE_FOODIE, DELETE_FOODIE_ERROR
} from '../actions/types';

const initialState = {
  foodiesLoading: true,
  foodies: null,
  foodie: null,
}

export default (state = initialState, action) => {
  switch(action.type) {

    case LOAD_FOODIES:
      return {
        ...state,
        foodiesLoading: true
      }

    case GET_FOODIES:
      return {
        ...state,
        foodiesLoading: false,
        foodies: action.payload
      }

    case GET_FOODIE:
      return {
        ...state,
        foodiesLoading: false,
        foodie: action.payload
      }

    case ADD_FOODIE:
      return {
        ...state,
        foodiesLoading: false,
        foodies: [
          action.payload,
          ...state.foodies
        ]
      }
      
    case UPDATE_FOODIE:
      return {
        ...state,
        foodiesLoading: false,
        foodie: {
          ...state.foodie,
          name: action.payload.name ? action.payload.name : state.foodie.name,
          description: action.payload.description ? action.payload.description : state.foodie.description,
          likes: action.payload.likes ? action.payload.likes : state.foodie.likes
        }
      }
      
    case UPDATE_LIKE:
      return {
        ...state,
        foodiesLoading: false,
        foodies: state.foodies.map(foodie => {
          if (foodie.id === action.payload.id) {
            foodie.likes = action.payload.likes
          }
          return foodie
        })
      }
      
    case DELETE_FOODIE:
      return {
        ...state,
        foodiesLoading: false,
        foodies: state.foodies.filter(foodie => foodie.id !== action.payload)
      }

    case ADD_FOODIE_ERROR, DELETE_FOODIE_ERROR, GET_FOODIES_ERROR, GET_FOODIE_ERROR, UPDATE_FOODIE_ERROR, UPDATE_LIKE_ERROR:
      return {
        ...state,
        foodiesLoading: false,
      }

    default:
      return state;
  }
}