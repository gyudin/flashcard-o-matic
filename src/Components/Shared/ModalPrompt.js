import React from "react";

const ModalPrompt = ({ onCancel, onConfirm, message, cancelText, confirmText }) => {
  return (
    <div className="prompt-backdrop">
      <div className="prompt">
        <div className="prompt-body">
          <p>{message}</p>
          <div className="d-flex justify-content-between">
            <button onClick={onCancel} className="btn btn-secondary">
              {cancelText}
            </button>
            <button onClick={onConfirm} className="btn btn-primary">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPrompt;