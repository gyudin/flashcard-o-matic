import React from 'react';

const DeletePrompt = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-prompt-overlay">
      <div className="delete-prompt">
        <div className="delete-prompt-content">
          <h4>Are you sure you want to delete?</h4>
          <p>This action cannot be undone.</p>
          <div className="delete-prompt-actions">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;