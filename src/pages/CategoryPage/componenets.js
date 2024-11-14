import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../store/actions/categoryActions';
import Modal from './Modal'; // Import the modal component
import { toast } from 'react-toastify';

const CategoryCPage = () => {
  const { categories, categoryFetched, error } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!categoryFetched) {
      dispatch(getCategories());
    }
  }, [categoryFetched, dispatch]);

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      const newCategory = { name: categoryName };
      dispatch(createCategory(newCategory));
      setCategoryName('');
    } else {
      toast.error('Category Name Cannot be blank..');
    }
  };

  const handleUpdateCategory = () => {
    if (selectedCategory && categoryName.trim() !== '') {
      const updatedCategory = { ...selectedCategory, name: categoryName };
      dispatch(updateCategory(updatedCategory));
      setShowModal(false);
      setCategoryName('');
    }
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCategoryName('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Category Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <button
          onClick={handleAddCategory}
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Category
        </button>
      </div>

      {/* Display Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Category Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-800">{category.name}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => openUpdateModal(category)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Category */}
      <Modal
        showModal={showModal}
        category={selectedCategory}
        onClose={closeModal}
        onSave={handleUpdateCategory}
        onChange={(name) => setCategoryName(name)}
      />
    </div>
  );
};

export default CategoryCPage;
