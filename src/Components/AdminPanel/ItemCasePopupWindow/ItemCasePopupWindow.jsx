import React, { useState } from 'react';
import './ItemCasePopupWindow.css'; // Link the CSS file

const ItemCasePopupWindow = ({ selectedRowData, onClose, onSubmit, onReject }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const images = [
        selectedRowData?.image1 || 'https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1727811362~exp=1727814962~hmac=f214e56be739405d6a0b5a48eec5bd5b9c34ed125702be6e7f695b3653e0a23f&w=1380',
        selectedRowData?.image2 || 'https://img.freepik.com/free-photo/man-woman-posing-together-medium-shot_23-2149903736.jpg?t=st=1727811670~exp=1727815270~hmac=34a5742a8c16a62f029cfe15f98b7b7f67b1508b82800925f34ea0eb7525fd2e&w=740',
        selectedRowData?.image3 || 'https://img.freepik.com/free-photo/side-view-man-kissing-woman-cheek_23-2149903746.jpg?t=st=1727811687~exp=1727815287~hmac=6458ebc6e77d3d1fe211b48e35354e9549b378f4e9a149055b1ba5b09703529d&w=740',
        selectedRowData?.image4 || 'https://img.freepik.com/free-photo/side-view-plus-size-couple-kissing_23-2149903759.jpg?t=st=1727811695~exp=1727815295~hmac=ea33ed9ce41963d562366abffac24db9e1bf5169cf8a31ce2170439147b6396a&w=740',
        selectedRowData?.image5 || 'https://img.freepik.com/free-photo/side-view-man-kissing-woman-cheek_23-2149903746.jpg?t=st=1727811687~exp=1727815287~hmac=6458ebc6e77d3d1fe211b48e35354e9549b378f4e9a149055b1ba5b09703529d&w=740',

    ];

    const openImagePreview = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImagePreview = () => {
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const showPreviousImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="popupOverlay">
            <div className="popupContent">
                {/* Left Section */}
                <div className="popupContentLeft">
                    <div className="popupContentForm">
                        <h3>Case Form</h3>

                        <div className="formField">
                            <label>Case Category</label>
                            <input type="text" readOnly value="Some Case Category" />
                        </div>

                        <div className="formField">
                            <label>Case Description</label>
                            <textarea name="" id="" readOnly value="Description of the case goes here"></textarea>
                        </div>

                        <div className="formField">
                            <label>Request Description</label>
                            <textarea name="" id="" readOnly value="Request description from the user"></textarea>
                        </div>

                        <div className="relatedImages">
                            <h4>Images Related to Case</h4>
                            <div className="imageGrid">
                                {images.map((image, index) => (
                                    <div key={index} className="thumbnail" onClick={() => openImagePreview(index)}>
                                        <img src={image} alt={`Related ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Case Status Options */}
                        <div className="caseStatusOptions">
                            <h4>Case Status</h4>
                            <ul>
                                <li>
                                    <input type="radio" name='itemCaseAction' /> Level One Case Open
                                    <label htmlFor="itemCaseAction">Descriotion</label>
                                </li>
                                <li>
                                    <input type="radio" name='itemCaseAction' /> Level Two Case Open
                                    <label htmlFor="itemCaseAction">Descriotion</label>
                                </li>
                                <li>
                                    <input type="radio" name='itemCaseAction' /> Level Three Case Open
                                    <label htmlFor="itemCaseAction">Descriotion</label>
                                </li>
                                <li>
                                    <input type="radio" name='itemCaseAction' /> Remove Account Permanently
                                    <label htmlFor="itemCaseAction">Descriotion</label>
                                </li>
                                <li>
                                    <input type="radio" name='itemCaseAction' /> Don’t do anything
                                    <label htmlFor="itemCaseAction">Descriotion</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="popupContentRight">
                    <div className="caseOpener">
                        <h4>Case Opener</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                                <img src='https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1727811362~exp=1727814962~hmac=f214e56be739405d6a0b5a48eec5bd5b9c34ed125702be6e7f695b3653e0a23f&w=1380' alt="" />
                            </div>
                            <div className="caseDetails">
                                <h2>Ravindu Dilshan</h2>
                                <div>
                                <p>Existing case: 04</p>
                                <p>Current Case Level: 01</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="caseAffecter">
                        <h4>Case Affecter</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                                <img src='https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1727811362~exp=1727814962~hmac=f214e56be739405d6a0b5a48eec5bd5b9c34ed125702be6e7f695b3653e0a23f&w=1380' alt="" />
                            </div>
                            <div className="caseDetails">
                                <h2>Ravindu Dilshan</h2>
                                <div>
                                <p>Existing case: 04</p>
                                <p>Current Case Level: 01</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="caseAffecter">
                        <h4>Item</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                                <img src='https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?t=st=1727811362~exp=1727814962~hmac=f214e56be739405d6a0b5a48eec5bd5b9c34ed125702be6e7f695b3653e0a23f&w=1380' alt="" />
                            </div>
                            <div className="caseDetails">
                                <h2>Item Name</h2>
                                <div>
                                <p>Existing case: 04</p>
                                <p>Current Case Level: 01</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Message and Action buttons */}
                    <div className="userMessageBox">
                        <textarea placeholder="Enter the message for notify User"></textarea>
                    </div>

                    <div className="actions">
                        <button className="btn rejectBtn" onClick={onReject}>Reject</button>
                        <button className="btn submitBtn" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {selectedImageIndex !== null && (
                <div className="imagePreviewModal">
                    <button className="closePreviewBtn" onClick={closeImagePreview}>Close</button>
                    <div className="imagePreviewContent">
                        <button className="previousImageBtn" onClick={showPreviousImage}>Previous</button>
                        <img src={images[selectedImageIndex]} alt="Preview" className="previewImage" />
                        <button className="nextImageBtn" onClick={showNextImage}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemCasePopupWindow;
