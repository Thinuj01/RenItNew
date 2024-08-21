import React from 'react';
import './ImageUpload.css'

import { FaPlus, FaTrash } from 'react-icons/fa';

function ImageUpload({ images, handleImageChange, handleRemoveImage }) {
    return (
        <>
            <div className="mageUploadMainContainer">
                <h3>Add Images</h3>
                <div className="image-upload-container">
                    <div className="image-preview-grid">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="image-square">
                                {images[index] ? (
                                    <div className="image-container">
                                        <img src={URL.createObjectURL(images[index])} alt={`Preview ${index + 1}`} />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="upload-image" className="upload-placeholder">
                                        <FaPlus className="plus-icon" />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        id="upload-image"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </>
    );
}

export default ImageUpload;
