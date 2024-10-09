// PopupComponent.js
import React, { useState, useEffect } from 'react';
import './CaseOpenPopupWindow.css';
import ImageUpload from '../../AddItemForm/ImageUpload';

const CaseOpenPopupWindow = ({ isOpen, onClose, title, categoryOptions, label1, label2 }) => {
    if (!isOpen) return null; // If not open, don't render anything.

    const [images, setImages] = useState([]);

    

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => {
            const newImages = [...prevImages, ...files].slice(0, 5); // Limiting to 5 images
            if (newImages.length > 0 && item.imageUrl === 'https://via.placeholder.com/250') {
                // Update the item imageUrl with the first image's URL
                setItem({
                    ...item,
                    imageUrl: URL.createObjectURL(newImages[0]),
                });
            }
            return newImages;
        });
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

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

                    <div className="form-group">
                        <label htmlFor="textbox2">Add Images Related to Case:</label>
                        <ImageUpload
                            images={images}
                            handleImageChange={handleImageChange}
                            handleRemoveImage={handleRemoveImage}
                        />
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
