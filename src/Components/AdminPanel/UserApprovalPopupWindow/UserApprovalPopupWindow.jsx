import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserApprovalPopupWindow.css'; // Link the CSS file

const UserApprovalPopupWindow = ({ selectedRowData, onClose }) => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, {
          withCredentials: true
        })
          .then(response => {
            const data = response.data;
            console.log(response.data);
            setDetails(data);
          });
      }, []);
    const handleAction = (action) => {
        axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php', {
            params: { status: action, nic: selectedRowData.NIC_number, admin_NIC: details.NIC }
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.success) {
                    alert(`User ${action}d successfully!`);  // Dynamic success message
                    onClose();  // Close the popup after successful action
                } else {
                    alert('Error: ' + response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
                alert('An error occurred. Please try again.');
            });
    };
    
    const handleSubmit = () => {
        handleAction('approve');
    };

    const handleReject = () => {
        handleAction('reject');
    };
    
    return (
        <div className="popup-overlay ">
            <div className="popup-content">
                <div className="popupContentLeft">
                    <div className="popup-content-form">
                        <h3>User Form</h3>

                        <div className="form-field">
                            <label>First Name</label>
                            <input type="text" value={selectedRowData?.first_name || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <input type="text" value={selectedRowData?.last_name || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>NIC Number</label>
                            <input type="text" value={selectedRowData?.NIC_number || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Date of Birth</label>
                            <input type="text" value={selectedRowData?.DOB || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Gender</label>
                            <input type="text" value={selectedRowData?.gender || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>District</label>
                            <input type="text" value={selectedRowData?.district || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Postal Code</label>
                            <input type="text" value={selectedRowData?.postal_code || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Permenant Address</label>
                            <textarea name="" id="" value={selectedRowData?.permanent_address || ''} readOnly></textarea>
                        </div>
                        <div className="form-field">
                            <label>Email Address</label>
                            <input type="email" value={selectedRowData?.email_address || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Mobile Number</label>
                            <input type="tel" value={selectedRowData?.phone_number || ''} readOnly />
                        </div>
                    </div>
                </div>

                <div className="popupContentRight">
                    <div className="closeDiv">
                    <button className="btn close-btn" onClick={onClose}>Close</button>
                    </div>
                
                    <h4>User NIC</h4>
                    <div className="image-preview">
                        <img src={'http://localhost:4433/RentIT/' + selectedRowData.NIC_photo.slice(3)} alt="User NIC" />
                    </div>

                    <h4>User Residential Proof</h4>
                    <div className="image-preview">
                        <img src={'http://localhost:4433/RentIT/' + selectedRowData.residential_proof.slice(3)} alt="User Residential Proof" />
                    </div>
                    <div className="actions">
                        <button className="btn reject-btn" onClick={handleReject}>Reject</button>
                        <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="userMessageBox">
                        <textarea name="" id="" placeholder='Enter the message for notify User'></textarea>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserApprovalPopupWindow;
