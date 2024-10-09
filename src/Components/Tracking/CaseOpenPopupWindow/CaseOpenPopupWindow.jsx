// PopupComponent.js
import React from 'react';
import './CaseOpenPopupWindow.css';

const CaseOpenPopupWindow = ({ isOpen, onClose, title, categoryOptions, label1, label2 }) => {
    if (!isOpen) return null; // If not open, don't render anything.

    return (
        <div className="popup-overlay">
            <div className="popup-window">
                <h2>{title}</h2>

                {/* Dropdown for Category */}
                <form action="">
                    <div className="form-group">
                        <label htmlFor="category-select">Category:</label>
                        <select id="category-select" className="dropdown">
                            {categoryOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Textbox 1 */}
                    <div className="form-group">
                        <label htmlFor="textbox1">{label1}:</label>
                        <textarea id="textbox1" className="text-input" />
                    </div>

                    {/* Textbox 2 */}
                    <div className="form-group">
                        <label htmlFor="textbox2">{label2}:</label>
                        <textarea id="textbox2" className="text-input" />
                    </div>

                    {/* Buttons */}
                    <div className="popup-buttons">
                        <button className="close-button" onClick={onClose}>Close</button>
                        <button className="submit-button" onClick={() => alert('Form Submitted')}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CaseOpenPopupWindow;
