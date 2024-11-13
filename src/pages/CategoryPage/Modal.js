// Modal.js
import React from 'react';
import './Modal.css'; // Assuming you will add basic styles for the modal

const Modal = ({ showModal, category, onClose, onSave,onChange }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Update Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          defaultValue={category ? category.name : ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={() => onSave(category.name)}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
