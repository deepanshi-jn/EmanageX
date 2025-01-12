import React from 'react';

const TaskPendingModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>If You have pending tasks!</h2>
        <p>Please complete your pending tasks. <br /> Thank you 😊</p>
        <button onClick={onClose} className="noted-button">Noted</button>
      </div>
    </div>
  );
};

export default TaskPendingModal;
