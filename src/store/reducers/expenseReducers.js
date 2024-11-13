import {
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_FAILURE,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_FAILURE,
    DELETE_EXPENSE_REQUEST,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
    GET_EXPENSES_REQUEST,
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_FAILURE
  } from '../actionTypes/expenseActionTypes';
  
  const initialState = {
    expenses: [],
    loading: false,
    error: null,
    expenseFetched: false,
  };
  
  const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle the start of each request
      case GET_EXPENSES_REQUEST:
      case CREATE_EXPENSE_REQUEST:
      case UPDATE_EXPENSE_REQUEST:
      case DELETE_EXPENSE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      // Handle successful fetch of expenses
      case GET_EXPENSES_SUCCESS:
        return {
          ...state,
          loading: false,
          expenses: action.payload, // Replace with fetched expenses
          expenseFetched: true,
        };
      
      // Handle successful creation of a new expense
      case CREATE_EXPENSE_SUCCESS:
        return {
          ...state,
          loading: false,
          expenses: [...state.expenses, action.payload], // Add new expense to the list
          expenseFetched: true,
        };
      
      // Handle successful update of an expense
      case UPDATE_EXPENSE_SUCCESS:
        return {
          ...state,
          loading: false,
          expenseFetched: true,
          expenses: state.expenses.map((expense) =>
            expense.id === action.payload.id ? action.payload : expense
          ),
        };
  
      // Handle successful deletion of an expense
      case DELETE_EXPENSE_SUCCESS:
        return {
          ...state,
          loading: false,
          expenses: state.expenses.filter(
            (expense) => expense.id !== action.payload
          ),
        };
      
      // Handle failure of any request (fetch, create, update, delete)
      case GET_EXPENSES_FAILURE:
      case CREATE_EXPENSE_FAILURE:
      case UPDATE_EXPENSE_FAILURE:
      case DELETE_EXPENSE_FAILURE:
        return {
          ...state,
          loading: false,
          expenseFetched: false,
          error: action.payload, // Store the error message in state
        };
      
      default:
        return state;
    }
  };
  
  export default expenseReducer;
  