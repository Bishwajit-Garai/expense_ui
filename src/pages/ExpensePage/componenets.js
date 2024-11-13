import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal'; // Import the modal component
import './ExpenseCPage.css'; // Import the CSS file for styling
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../../store/actions/expenseActions';

const ExpenseCPage = () => {
  const { expenses, expenseFetched, error } = useSelector((state) => state.expenseReducer);
  const { categories } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null); // For editing an expense
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  // Fetch expenses and categories when component mounts
  useEffect(() => {
    if (!expenseFetched) {
      dispatch(getExpenses()); // Fetch expenses
    }
  }, [expenseFetched, dispatch]);

  // Handle adding a new expense
  const handleAddExpense = () => {
    if (amount && description.trim() && categoryId && date) {
      const newExpense = { amount, description, date, categoryId };
      dispatch(createExpense(newExpense)); // Dispatch the action to create the expense
      setAmount('');
      setDescription('');
      setCategoryId('');
      setDate('');
    }
  };

  // Handle updating an existing expense
  const handleUpdateExpense = () => {
    if (selectedExpense && amount && description.trim() && categoryId && date) {
      const updatedExpense = { ...selectedExpense, amount, description, date, categoryId };
      dispatch(updateExpense(updatedExpense)); // Dispatch the update action
      setShowModal(false);
      setAmount('');
      setDescription('');
      setCategoryId('');
      setDate('');
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId)); // Dispatch the delete action
  };

  // Open the modal for updating an expense
  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategoryId(expense.categoryId);
    setDate(expense.date);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setAmount('');
    setDescription('');
    setCategoryId('');
    setDate('');
  };

  return (
    <div className="expense-container">
      {/* Expense Form */}
      <div className="expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddExpense} className="btn add-btn">
          Add Expense
        </button>
      </div>

      {/* Display Error */}
      {error && <p className="error">{error}</p>}

      {/* Expense Table */}
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense?.Category?.name|| categories.find((category) => category.id === parseInt(expense.categoryId))?.name}</td>
                <td>{new Date(expense.date).toDateString()}</td>
                <td>
                  <button
                    onClick={() => openUpdateModal(expense)}
                    className="btn update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Expense */}
      <Modal
        showModal={showModal}
        expense={selectedExpense}
        onClose={closeModal}
        onSave={handleUpdateExpense}
        categories={categories}
        date={date}
        onChange={(field, value) => {
          if (field === 'amount') setAmount(value);
          if (field === 'description') setDescription(value);
          if (field === 'categoryId') setCategoryId(value);
          if (field === 'date') setDate(value);
        }}
      />
    </div>
  );
};

export default ExpenseCPage;
