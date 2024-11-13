import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../actionTypes/categoryActionTypes';
import { toast } from 'react-toastify';

import axios from 'axios';
import { API_URL } from '../../constants/ConstantData';

// Action creator for the GET_CATEGORIES_REQUEST action
const GetCategoriesRequest = () => {
  return { type: GET_CATEGORIES_REQUEST }; // Return the action for request
};

// Action creator for the GET_CATEGORIES_SUCCESS action
const GetCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories, // Payload is the data we received
  };
};

// Action creator for the GET_CATEGORIES_FAILURE action
const GetCategoriesFailure = (error) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: error, // Payload is the error message
  };
};

// Action creator for the CREATE_CATEGORY_REQUEST action
const CreateCategoryRequest = () => {
  return { type: CREATE_CATEGORY_REQUEST };
};

// Action creator for the CREATE_CATEGORY_SUCCESS action
const CreateCategorySuccess = (category) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category, // The newly created category
  };
};

// Action creator for the CREATE_CATEGORY_FAILURE action
const CreateCategoryFailure = (error) => {
  return {
    type: CREATE_CATEGORY_FAILURE,
    payload: error, // The error message
  };
};

// Action creator for the UPDATE_CATEGORY_REQUEST action
const UpdateCategoryRequest = () => {
  return { type: UPDATE_CATEGORY_REQUEST };
};

// Action creator for the UPDATE_CATEGORY_SUCCESS action
const UpdateCategorySuccess = (category) => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category, // The updated category
  };
};

// Action creator for the UPDATE_CATEGORY_FAILURE action
const UpdateCategoryFailure = (error) => {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    payload: error, // The error message
  };
};

// Action creator for the DELETE_CATEGORY_REQUEST action
const DeleteCategoryRequest = () => {
  return { type: DELETE_CATEGORY_REQUEST };
};

// Action creator for the DELETE_CATEGORY_SUCCESS action
const DeleteCategorySuccess = (categoryId) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: categoryId, // The ID of the deleted category
  };
};

// Action creator for the DELETE_CATEGORY_FAILURE action
const DeleteCategoryFailure = (error) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: error, // The error message
  };
};

// Main action creator to fetch categories
export const getCategories = () => async (dispatch) => {
  dispatch(GetCategoriesRequest());

  try {
    const response = await axios.get(`${API_URL}/categories`);
    dispatch(GetCategoriesSuccess(response.data)); // Dispatch success action with categories
  } catch (error) {
    dispatch(GetCategoriesFailure(error.message || 'Failed to fetch categories'));
  }
};

// Main action creator to create a category
export const createCategory = (category) => async (dispatch) => {
  dispatch(CreateCategoryRequest());

  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    dispatch(CreateCategorySuccess(response.data)); // Dispatch success action with the created category
    toast.success("Category Created SuccessFully")
  } catch (error) {
    dispatch(CreateCategoryFailure(error.message || 'Failed to create category'));
    toast.error("Something Went Wrong..")

  }
};

// Main action creator to update a category
export const updateCategory = (category) => async (dispatch) => {
  dispatch(UpdateCategoryRequest());

  try {
    const response = await axios.put(`${API_URL}/categories/${category.id}`, category);
    dispatch(UpdateCategorySuccess(response.data)); // Dispatch success action with the updated category
    toast.success("Category Updated SuccessFully")

  } catch (error) {
    dispatch(UpdateCategoryFailure(error.message || 'Failed to update category'));
    toast.error("Something Went Wrong..")

  }
};

// Main action creator to delete a category
export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(DeleteCategoryRequest());

  try {
    await axios.delete(`${API_URL}/categories/${categoryId}`);
    dispatch(DeleteCategorySuccess(categoryId)); // Dispatch success action with the deleted category ID
    toast.success("Category Deleted SuccessFully")

  } catch (error) {
    dispatch(DeleteCategoryFailure(error.message || 'Failed to delete category'));
    toast.error("Something Went Wrong..")
  }
};
