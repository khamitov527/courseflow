import React from 'react';

const ModeToggleButton = ({ isEditMode, onToggle }) => (
  <button onClick={onToggle}>
    Switch to {isEditMode ? 'View' : 'Edit'} Mode
  </button>
);

export default ModeToggleButton;
