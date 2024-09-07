import React, { useState } from 'react';
import './ToggleableSection.css';

function ToggleableSection( props ) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="toggleable-section">
      <div className="toggleable-header" onClick={toggleSection}>
        <h3>{props.title}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      <div className={`toggleable-content ${isOpen ? 'open' : ''}`}>
        {props.children}
      </div>
    </div>
  );
}

export default ToggleableSection;
