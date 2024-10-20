import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CaseOpenPopupWindow.css';
import ImageUpload from '../../AddItemForm/ImageUpload';

const CaseOpenPopupWindow = ({ isOpen, onClose, title, categoryOptions, label1, label2, caseData }) => {
    if (!isOpen) return null; // If not open, don't render anything.

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [request, setRequest] = useState('');
    const [images, setImages] = useState([]);

    let action = '';
    if(title === "Case open to Item"){
        action = "7";
    } else if(title === "Case open to Buyer") {
        action = "6";
    } else if(title === "Case open to Seller"){
        action = "5";
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => {
            const newImages = [...prevImages, ...files].slice(0, 5); // Limiting to 5 images
            return newImages;
        });
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        formData.append('status', action);
        formData.append('sellerNIC', caseData.sellerNIC);
        formData.append('buyerNIC', caseData.buyerNIC);
        formData.append('cate', category);
        formData.append('desc', description);
        formData.append('req', request);
        formData.append('item_id', caseData.item_id);
        try {
            const response = await axios.post('http://localhost:4433/RentIT/Controllers/caseController.php', formData,
                {
                    withCredentials: true
                });
            console.log('Information saved successfully: ', response.data);
            response.data.success? alert('Case submitted successully.') : alert('Case did not submit successfully');
            onClose();
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-window">
                <h2>{title}</h2>

                {/* Dropdown for Category */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category-select">Category:</label>
                        <select id="category-select" className="dropdown" value={category} onChange={handleCategoryChange}>
                            <option value="" disabled>Select a category</option>
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
                        <textarea id="textbox1" className="text-input" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    {/* Textbox 2 */}
                    <div className="form-group">
                        <label htmlFor="textbox2">{label2}:</label>
                        <textarea id="textbox2" className="text-input" value={request} onChange={(e) => setRequest(e.target.value)} />
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
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CaseOpenPopupWindow;
