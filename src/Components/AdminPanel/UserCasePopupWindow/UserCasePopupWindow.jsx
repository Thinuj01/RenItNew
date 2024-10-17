import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userCasePopupWindow.css'; // Link the CSS file

const UserCasePopupWindow = ({ selectedRowData, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedCaseAction, setSelectedCaseAction] = useState('');

    const getCaseCategory = (caseId) => {
        const prefix = caseId.substring(0, 3); // Get the first 3 letters of the caseId
        switch (prefix) {
          case "Non":
            return "Non-Delivery of Goods";
          case "Shi":
            return "Shipping Issues";
          case "Bre":
            return "Breach of Platform Policies";
          case "Unj":
            return "Unjustified Price Changes";
          case "Una":
            return "Unauthorized Payments";
          case "Pay":
            return "Payment Delay";
          case "Fra":
            return "Fraudulent Returns";
          default:
            return "Other";
        }
      };

    const handleCaseActionChange = (e) => {
        setSelectedCaseAction(e.target.value);
    };

    const images = [
        selectedRowData.case_picture_01? 'http://localhost:80/RentIT/' + selectedRowData.case_picture_01.slice(3):'',
        selectedRowData.case_picture_02? 'http://localhost:80/RentIT/' + selectedRowData.case_picture_02.slice(3):'',
        selectedRowData.case_picture_03? 'http://localhost:80/RentIT/' + selectedRowData.case_picture_03.slice(3):'',
        selectedRowData.case_picture_04? 'http://localhost:80/RentIT/' + selectedRowData.case_picture_04.slice(3):'',
        selectedRowData.case_picture_05? 'http://localhost:80/RentIT/' + selectedRowData.case_picture_05.slice(3):''
    ];

    const handleAction = () => {
        axios.get('http://localhost:4433/RentIT/Controllers/caseController.php', {
            params: { status: "3", affecterNIC: selectedRowData.affecterNIC, caseAction: selectedCaseAction, caseid: selectedRowData.user_case_id }
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.success) {
                    alert(`Case closed successfully!`);
                    onClose();
                } else {
                    alert('Error: ' + response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
                alert('An error occurred. Please try again.');
            });
    };
    
    // const images = [
    //     '',
    //     '',
    // ];

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
                            <input type="text" readOnly value={getCaseCategory(selectedRowData.case_id)} />
                        </div>

                        <div className="formField">
                            <label>Case Description</label>
                            <textarea name="" id="" readOnly value={selectedRowData.case_discription}></textarea>
                        </div>

                        <div className="formField">
                            <label>Request Description</label>
                            <textarea name="" id="" readOnly value={selectedRowData.request_discription}></textarea>
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
                                    <input 
                                        type="radio" 
                                        name="userCaseAction" 
                                        value="1" 
                                        onChange={handleCaseActionChange} 
                                    /> Level One Case Open
                                    <label htmlFor="userCaseAction">Description</label>
                                </li>
                                <li>
                                    <input 
                                        type="radio" 
                                        name="userCaseAction" 
                                        value="2" 
                                        onChange={handleCaseActionChange} 
                                    /> Level Two Case Open
                                    <label htmlFor="userCaseAction">Description</label>
                                </li>
                                <li>
                                    <input 
                                        type="radio" 
                                        name="userCaseAction" 
                                        value="3" 
                                        onChange={handleCaseActionChange} 
                                    /> Level Three Case Open
                                    <label htmlFor="userCaseAction">Description</label>
                                </li>
                                <li>
                                    <input 
                                        type="radio" 
                                        name="userCaseAction" 
                                        value="4" 
                                        onChange={handleCaseActionChange} 
                                    /> Remove Account Permanently
                                    <label htmlFor="userCaseAction">Description</label>
                                </li>
                                <li>
                                    <input 
                                        type="radio" 
                                        name="userCaseAction" 
                                        value="0" 
                                        onChange={handleCaseActionChange} 
                                    /> Don’t do anything
                                    <label htmlFor="userCaseAction">Description</label>
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
                                <img src={selectedRowData.openerPP?'http://localhost:4433/RentIT/'+selectedRowData.openerPP.slice(3):'http://localhost:4433/RentIT/images/ProfileImages/'+selectedRowData.openerGender.toLowerCase()+'.jpg'} />
                            </div>
                            <div className="caseDetails">
                                <h2>{selectedRowData.openerFname +' '+ selectedRowData.openerLname}</h2>
                                <div>
                                <p>Existing case: {selectedRowData.openerCaselvl}</p>
                                {/* <p>Current Case Level: </p> */}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="caseAffecter">
                        <h4>Case Affecter</h4>
                        <div className="caseDetailsCard">
                            <div className="caseUserImage">
                            <img src={selectedRowData.affecterPP?'http://localhost:4433/RentIT/'+selectedRowData.affecterPP.slice(3):'http://localhost:4433/RentIT/images/ProfileImages/'+selectedRowData.affecterGender.toLowerCase()+'.jpg'} />
                            </div>
                            <div className="caseDetails">
                                <h2>{selectedRowData.affecterFname +' '+ selectedRowData.affecterLname}</h2>
                                <div>
                                <p>Existing case: {selectedRowData.affecterCaselvl}</p>
                                <p>Current Case Level: {selectedCaseAction}</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Message and Action buttons */}
                    <div className="userMessageBox">
                        <textarea placeholder="Enter the message for notify User"></textarea>
                    </div>

                    <div className="actions">
                        {/* <button className="btn rejectBtn" onClick={onReject}>Reject</button> */}
                        <button className="btn submitBtn" onClick={handleAction} disabled={selectedCaseAction? false: true}>Submit</button>
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
