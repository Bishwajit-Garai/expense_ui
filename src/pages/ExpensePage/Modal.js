import React from 'react';
import './Modal.css'; // Import the styles for the modal

const Modal = ({ showModal, expense, onClose, onSave, onChange, categories,date }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Update Expense</h2>

        <div className="modal-form">
          <input
            type="number"
            placeholder="Amount"
            value={expense?.amount || ''}
            onChange={(e) => onChange('amount', e.target.value)}
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={expense?.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="modal-input"
          />
          <select
            value={expense?.categoryId || ''}
            onChange={(e) => onChange('categoryId', e.target.value)}
            className="modal-select"
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
            value={date || ''}
            onChange={(e) => onChange('date', e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn cancel-btn">Cancel</button>
          <button onClick={onSave} className="btn save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
