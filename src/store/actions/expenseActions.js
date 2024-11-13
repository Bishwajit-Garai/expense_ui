import {
    GET_EXPENSES_REQUEST,
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_FAILURE,
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_FAILURE,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_FAILURE,
    DELETE_EXPENSE_REQUEST,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
  } from '../actionTypes/expenseActionTypes';
  import { toast } from 'react-toastify';
  import axios from 'axios';
  import { API_URL } from '../../constants/ConstantData';
  
  // Action creator for the GET_EXPENSES_REQUEST action
  const GetExpensesRequest = () => {
    return { type: GET_EXPENSES_REQUEST }; // Return the action for request
  };
  
  // Action creator for the GET_EXPENSES_SUCCESS action
  const GetExpensesSuccess = (expenses) => {
    return {
      type: GET_EXPENSES_SUCCESS,
      payload: expenses, // Payload is the data we received
    };
  };
  
  // Action creator for the GET_EXPENSES_FAILURE action
  const GetExpensesFailure = (error) => {
    return {
      type: GET_EXPENSES_FAILURE,
      payload: error, // Payload is the error message
    };
  };
  
  // Action creator for the CREATE_EXPENSE_REQUEST action
  const CreateExpenseRequest = () => {
    return { type: CREATE_EXPENSE_REQUEST };
  };
  
  // Action creator for the CREATE_EXPENSE_SUCCESS action
  const CreateExpenseSuccess = (expense) => {
    return {
      type: CREATE_EXPENSE_SUCCESS,
      payload: expense, // The newly created expense
    };
  };
  
  // Action creator for the CREATE_EXPENSE_FAILURE action
  const CreateExpenseFailure = (error) => {
    return {
      type: CREATE_EXPENSE_FAILURE,
      payload: error, // The error message
    };
  };
  
  // Action creator for the UPDATE_EXPENSE_REQUEST action
  const UpdateExpenseRequest = () => {
    return { type: UPDATE_EXPENSE_REQUEST };
  };
  
  // Action creator for the UPDATE_EXPENSE_SUCCESS action
  const UpdateExpenseSuccess = (expense) => {
    return {
      type: UPDATE_EXPENSE_SUCCESS,
      payload: expense, // The updated expense
    };
  };
  
  // Action creator for the UPDATE_EXPENSE_FAILURE action
  const UpdateExpenseFailure = (error) => {
    return {
      type: UPDATE_EXPENSE_FAILURE,
      payload: error, // The error message
    };
  };
  
  // Action creator for the DELETE_EXPENSE_REQUEST action
  const DeleteExpenseRequest = () => {
    return { type: DELETE_EXPENSE_REQUEST };
  };
  
  // Action creator for the DELETE_EXPENSE_SUCCESS action
  const DeleteExpenseSuccess = (expenseId) => {
    return {
      type: DELETE_EXPENSE_SUCCESS,
      payload: expenseId, // The ID of the deleted expense
    };
  };
  
  // Action creator for the DELETE_EXPENSE_FAILURE action
  const DeleteExpenseFailure = (error) => {
    return {
      type: DELETE_EXPENSE_FAILURE,
      payload: error, // The error message
    };
  };
  
  // Main action creator to fetch expenses
  export const getExpenses = () => async (dispatch) => {
    dispatch(GetExpensesRequest());
  
    try {
      const response = await axios.get(`${API_URL}/expenses`);
      dispatch(GetExpensesSuccess(response.data)); // Dispatch success action with expenses
    } catch (error) {
      dispatch(GetExpensesFailure(error.message || 'Failed to fetch expenses'));
    }
  };
  
  // Main action creator to create an expense
  export const createExpense = (expense) => async (dispatch) => {
    dispatch(CreateExpenseRequest());
  
    try {
      const response = await axios.post(`${API_URL}/expenses`, expense);
      dispatch(CreateExpenseSuccess(response.data)); // Dispatch success action with the created expense
      toast.success("Expense Created Successfully");
    } catch (error) {
      dispatch(CreateExpenseFailure(error.message || 'Failed to create expense'));
      toast.error("Something Went Wrong..");
    }
  };
  
  // Main action creator to update an expense
  export const updateExpense = (expense) => async (dispatch) => {
    dispatch(UpdateExpenseRequest());
  
    try {
      const response = await axios.put(`${API_URL}/expenses/${expense.id}`, expense);
      dispatch(UpdateExpenseSuccess(response.data)); // Dispatch success action with the updated expense
      toast.success("Expense Updated Successfully");
    } catch (error) {
      dispatch(UpdateExpenseFailure(error.message || 'Failed to update expense'));
      toast.error("Something Went Wrong..");
    }
  };
  
  // Main action creator to delete an expense
  export const deleteExpense = (expenseId) => async (dispatch) => {
    dispatch(DeleteExpenseRequest());
  
    try {
      await axios.delete(`${API_URL}/expenses/${expenseId}`);
      dispatch(DeleteExpenseSuccess(expenseId)); // Dispatch success action with the deleted expense ID
      toast.success("Expense Deleted Successfully");
    } catch (error) {
      dispatch(DeleteExpenseFailure(error.message || 'Failed to delete expense'));
      toast.error("Something Went Wrong..");
    }
  };
  