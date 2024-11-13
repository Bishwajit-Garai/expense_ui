// rootReducer.js
import { combineReducers } from 'redux';
import categoryReducer from './store/reducers/categoryReducers';
import expenseReducer from './store/reducers/expenseReducers';
const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    expenseReducer:expenseReducer,
});

export default rootReducer;
