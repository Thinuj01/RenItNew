import React, { useState } from 'react';
import './ItemApprovalPopupWindow.css'; // Link the CSS file

const ItemApprovalPopupWindow = ({ selectedRowData, onClose, onSubmit, onReject }) => {
    // Array of images (replace with dynamic data if available)
    const imageArray = [
        'https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1727811362~exp=1727814962~hmac=f214e56be739405d6a0b5a48eec5bd5b9c34ed125702be6e7f695b3653e0a23f&w=1380',
        'https://img.freepik.com/free-photo/man-woman-posing-together-medium-shot_23-2149903736.jpg?t=st=1727811670~exp=1727815270~hmac=34a5742a8c16a62f029cfe15f98b7b7f67b1508b82800925f34ea0eb7525fd2e&w=740',
        'https://img.freepik.com/free-photo/side-view-man-kissing-woman-cheek_23-2149903746.jpg?t=st=1727811687~exp=1727815287~hmac=6458ebc6e77d3d1fe211b48e35354e9549b378f4e9a149055b1ba5b09703529d&w=740',
        'https://img.freepik.com/free-photo/side-view-plus-size-couple-kissing_23-2149903759.jpg?t=st=1727811695~exp=1727815295~hmac=ea33ed9ce41963d562366abffac24db9e1bf5169cf8a31ce2170439147b6396a&w=740',
        'https://img.freepik.com/free-photo/side-view-woman-man-holding-hands_23-2149903731.jpg?t=st=1727811715~exp=1727815315~hmac=2f84aa3bd9d2be163e81b9ec8d8b8c3db6bae362f49bf33ca799c54dad397ba1&w=740',
    ];

    // State to manage the selected image
    const [selectedImage, setSelectedImage] = useState(imageArray[0]);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popupContentLeft">
                    <div className="popup-content-form">
                        <h3>Item Form</h3>
                        <div className="form-field">
                            <label>Item Title</label>
                            <input type="text" readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Description</label>
                            <textarea name="" id="" readOnly></textarea>
                        </div>
                        <div className="form-field">
                            <label>Item District</label>
                            <input type="text" readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Postal Code</label>
                            <input type="text" readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Address</label>
                            <textarea name="" id="" readOnly></textarea>
                        </div>
                        <div className="price-preview form-field">
                            <label>Price Preview</label>
                            <table>
                                <thead>
                                    <tr>
                                        <th><label>Rental Durations</label></th>
                                        <th><label>Price</label></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <td>20 Days</td>
                                        <td>250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form-field">
                            <label>Item Condition</label>
                            <input type="text" readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Category</label>
                            <input type="text" readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Sub-Categories</label>
                            <input type="text" readOnly />
                        </div>



                        <div className="form-field">
                            <label>Need to add Specific field related to category</label>
                            <input type="text" readOnly />
                        </div>
                    </div>

                </div>

                <div className="popupContentRight">
                    <div className="closeDiv">
                        <button className="btn close-btn" onClick={onClose}>Close</button>
                    </div>

                    {/* Image Slider */}
                    <h4>Item Images</h4>
                    <div className="itemApprovalPopupImageSlider">
                    
                        <div className="image-thumbnails">
                            {imageArray.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`thumbnail ${index + 1}`}
                                    className={`thumbnail-image ${selectedImage === image ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(image)} // Update selected image on click
                                />
                            ))}
                        </div>

                        <div className="selected-image">
                            <img src={selectedImage} alt="Selected" />
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn reject-btn" onClick={onReject}>Reject</button>
                        <button className="btn submit-btn" onClick={onSubmit}>Submit</button>
                    </div>

                    <div className="userMessageBox">
                        <textarea placeholder='Enter the message to notify the user'></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemApprovalPopupWindow;
