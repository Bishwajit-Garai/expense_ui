import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../store/actions/categoryActions';
import Modal from './Modal'; // Import the modal component
import './CategoryCPage.css'; // Import the CSS file for styling

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
    <div className="category-container">
      {/* Category Form */}
      <div className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory} className="btn add-btn">Add Category</button>
      </div>

      {/* Display Error */}
      {error && <p className="error">{error}</p>}

      {/* Category Table */}
      <div className="category-table">
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="category-item">
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => openUpdateModal(category)}
                    className="btn update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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
