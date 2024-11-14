import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal'; // Import the modal component
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
    if (amount && description.trim() && categoryId ) {
      const currentDate = date || new Date().toISOString().split('T')[0]; // If no date, set it to today's date
      const newExpense = { amount, description, date: currentDate, categoryId };
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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Expense Form */}
      <div className="space-y-4 mb-6">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddExpense}
          className=" bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add Expense
        </button>
      </div>

      {/* Display Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm">{expense.amount}</td>
                <td className="px-4 py-2 text-sm">{expense.description}</td>
                <td className="px-4 py-2 text-sm">
                  {expense?.Category?.name ||
                    categories.find((category) => category.id === parseInt(expense.categoryId))?.name}
                </td>
                <td className="px-4 py-2 text-sm">{new Date(expense.date).toDateString()}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => openUpdateModal(expense)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
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
