import React from 'react';
import './UserApprovalPopupWindow.css'; // Link the CSS file

const UserApprovalPopupWindow = ({ selectedRowData, onClose, onSubmit, onReject }) => {
    return (
        <div className="popup-overlay ">
            <div className="popup-content">
                <div className="popupContentLeft">
                    <div className="popup-content-form">
                        <h3>User Form</h3>

                        <div className="form-field">
                            <label>First Name</label>
                            <input type="text" value={selectedRowData?.firstName || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <input type="text" value={selectedRowData?.lastName || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>NIC Number</label>
                            <input type="text" value={selectedRowData?.nicNumber || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Date of Birth</label>
                            <input type="text" value={selectedRowData?.dob || ''} readOnly />
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
                            <input type="text" value={selectedRowData?.postal || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Permenant Address</label>
                            <textarea name="" id="" value={selectedRowData?.permenantAddress || ''} readOnly></textarea>
                        </div>
                        <div className="form-field">
                            <label>Email Address</label>
                            <input type="email" value={selectedRowData?.email || ''} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Mobile Number</label>
                            <input type="tel" value={selectedRowData?.mobileNb || ''} readOnly />
                        </div>
                    </div>
                </div>

                <div className="popupContentRight">
                    <div className="closeDiv">
                    <button className="btn close-btn" onClick={onClose}>Close</button>
                    </div>
                
                    <h4>User NIC</h4>
                    <div className="image-preview">
                        <img src={selectedRowData?.nicImage || ''} alt="User NIC" />
                    </div>

                    <h4>User Residential Proof</h4>
                    <div className="image-preview">
                        <img src={selectedRowData?.residentialProof || ''} alt="User Residential Proof" />
                    </div>
                    <div className="actions">
                        <button className="btn reject-btn" onClick={onReject}>Reject</button>
                        <button className="btn submit-btn" onClick={onSubmit}>Submit</button>
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
