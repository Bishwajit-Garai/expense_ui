import React from 'react';

const Modal = ({ showModal, onClose, onSave, onChange, categoryName, isAddingCategory }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-xl mb-4">{isAddingCategory ? 'Add New Category' : 'Update Category'}</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isAddingCategory ? 'Save' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
