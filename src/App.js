// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

import store from './store/store';
import Home from './pages/HomePage';
import Expense from './pages/ExpensePage';
import Category from './pages/CategoryPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer 
        position="top-right"  // Position of toast
        autoClose={5000}      // Toast auto close time in ms
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <div>
          {/* Define the Routes using element */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
