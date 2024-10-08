import React, { useState } from 'react';
import './userCasePopupWindow.css'; // Link the CSS file

const UserCasePopupWindow = ({ selectedRowData, onClose, onSubmit, onReject }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const images = [
        '',
        '',
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
                            <input type="text" readOnly value="" />
                        </div>

                        <div className="formField">
                            <label>Case Description</label>
                            <textarea name="" id="" readOnly value={selectedRowData.case_discription}></textarea>
                        </div>

                        <div className="formField">
                            <label>Request Description</label>
                            <textarea name="" id="" readOnly value={selectedRowData.request_discription}></textarea>
                        </div>

                        {/* <div className="relatedImages">
                            <h4>Images Related to Case</h4>
                            <div className="imageGrid">
                                {images.map((image, index) => (
                                    <div key={index} className="thumbnail" onClick={() => openImagePreview(index)}>
                                        <img src={image} alt={`Related ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div> */}

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
                    <div className="closeDiv">
                        <button className="btn close-btn" onClick={onClose}>Close</button>
                    </div>
                    <div className="caseOpener">
                        <h4>Case Opener</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                                <img src={selectedRowData.openerPP?'http://localhost:80/RentIT/'+selectedRowData.openerPP.slice(3):'http://localhost:80/RentIT/images/ProfileImages/'+selectedRowData.openerGender.toLowerCase()+'.jpg'} />
                            </div>
                            <div className="caseDetails">
                                <h2>{selectedRowData.openerFname +' '+ selectedRowData.openerLname}</h2>
                                <div>
                                <p>Existing case: {selectedRowData.openerCaselvl}</p>
                                <p>Current Case Level: </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="caseAffecter">
                        <h4>Case Affecter</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                            <img src={selectedRowData.affectorPP?'http://localhost:80/RentIT/'+selectedRowData.affectorPP.slice(3):'http://localhost:80/RentIT/images/ProfileImages/'+selectedRowData.affectorGender.toLowerCase()+'.jpg'} />
                            </div>
                            <div className="caseDetails">
                                <h2>{selectedRowData.affectorFname +' '+ selectedRowData.affectorLname}</h2>
                                <div>
                                <p>Existing case: {selectedRowData.affectorCaselvl}</p>
                                <p>Current Case Level: </p>
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

export default UserCasePopupWindow;
