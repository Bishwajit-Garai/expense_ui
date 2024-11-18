import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal'; // Import the modal component
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../../store/actions/expenseActions';

const ExpenseCPage = () => {
  const { expenses, expenseFetched, error } = useSelector((state) => state.expenseReducer);
  const { categories } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    date: '',
  });

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
    if (formData.amount && formData.description.trim() && formData.categoryId) {
      const currentDate = formData.date || new Date().toISOString().split('T')[0]; // If no date, set it to today's date
      const newExpense = { ...formData, date: currentDate };
      dispatch(createExpense(newExpense)); // Dispatch the action to create the expense
      setFormData({
        amount: '',
        description: '',
        categoryId: '',
        date: '',
      });
      setShowModal(false);
    }
  };

  // Handle updating an existing expense
  const handleUpdateExpense = () => {
    if (selectedExpense && formData.amount && formData.description.trim() && formData.categoryId && formData.date) {
      const updatedExpense = { ...selectedExpense, ...formData };
      dispatch(updateExpense(updatedExpense)); // Dispatch the update action
      setShowModal(false);
      setFormData({
        amount: '',
        description: '',
        categoryId: '',
        date: '',
      });
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId)); // Dispatch the delete action
  };

  // Open the modal for adding a new expense
  const openAddModal = () => {
    setFormData({
      amount: '',
      description: '',
      categoryId: '',
      date: '',
    });
    setSelectedExpense(null); // Ensure no selected expense when adding a new one
    setShowModal(true);
  };

  // Open the modal for updating an expense
  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setFormData({
      amount: expense.amount,
      description: expense.description,
      categoryId: expense.categoryId,
      date: expense.date,
    });
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      amount: '',
      description: '',
      categoryId: '',
      date: '',
    });
  };

  // Handle form field change
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Display Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Button to open modal for adding new expense */}
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white p-2 mb-6 rounded-md shadow-md hover:bg-blue-600 transition duration-200 "
      >
        + Add Expense
      </button>
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

      

      {/* Modal for Adding/Updating Expense */}
      <Modal
        showModal={showModal}
        expense={selectedExpense}
        onClose={closeModal}
        onSave={selectedExpense ? handleUpdateExpense : handleAddExpense} // Use add or update depending on the modal context
        categories={categories}
        formData={formData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ExpenseCPage;
