import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE
  } from '../actionTypes/categoryActionTypes';
  
  const initialState = {
    categories: [],
    loading: false,
    error: null,
    categoryFetched:false,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORIES_REQUEST:
      case CREATE_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload, // Replace with fetched categories,
          categoryFetch:true,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: [...state.categories, action.payload], // Add new category to the list
          categoryFetched:true
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categoryFetched:true,
          categories: state.categories.map((category) =>
            category.id === action.payload.id ? action.payload : category
          )
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: state.categories.filter(
            (category) => category.id !== action.payload
          )
        };
      case GET_CATEGORIES_FAILURE:
      case CREATE_CATEGORY_FAILURE:
      case UPDATE_CATEGORY_FAILURE:
      case DELETE_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          categoryFetched:false,
          error: action.payload // Store error message in state
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  