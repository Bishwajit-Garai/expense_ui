import React from 'react';

const Modal = ({ showModal, formData, onClose, onSave, onChange, categories }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {formData?.id ? 'Update Expense' : 'Add Expense'}
        </h2>

        <div className="space-y-4">
          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount || ''}
            onChange={(e) => onChange('amount', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Description Input */}
          <input
            type="text"
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Category Dropdown */}
          <select
            value={formData.categoryId || ''}
            onChange={(e) => onChange('categoryId', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          
          {/* Date Input */}
          <input
            type="date"
            value={formData.date || ''}
            onChange={(e) => onChange('date', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          {/* Save Button */}
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default Modal;
