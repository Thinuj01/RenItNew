import React from 'react';
import './UserForm.css';

function UserForm({ isBuyer, handleToggle }) {
    return (
        <>
            <div className="userFormContainer">
                {/* Left Side - Image Upload and Toggle */}
                <div className="userFormContainerLeft">
                    {/* Profile Picture */}
                    <div className="userProfilePic">
                        <img src="" alt="User Profile" id="profileImage" className="profileImage" />
                    </div>

                    {/* Add Image Button */}
                    <div className="userProfilePicAddButton">
                        <button type="button" className="addImageButton">Add Image</button>
                    </div>

                    {/* Toggle Buyer/Seller */}
                    <div className="userSwappingToggleButton">
                        <label className="toggleSwitch">
                            <input
                                type="checkbox"
                                checked={isBuyer}
                                onChange={handleToggle}
                            />
                            <span className="sliderUser"></span>
                        </label>
                        <span className="toggleLabel">{isBuyer ? 'Buyer' : 'Seller'}</span>
                    </div>
                </div>

                {/* Right Side - User Details */}
                <div className="userFormContainerRight">
                    <form className="userForm">
                        <div className="formGroup">
                            <label>Name</label>
                            <input type="text" value="Ravindu Dilshan" disabled />
                        </div>

                        <div className="dob_and_gender flexRow">
                            <div className="formGroup w-50">
                                <label>Date of Birth</label>
                                <input type="text" value="2000 - Aug -" disabled />
                            </div>
                            <div className="formGroup w-50">
                                <label>Gender</label>
                                <input type="text" value="Male" disabled />
                            </div>
                        </div>

                        <div className="district_and_postal flexRow">
                            <div className="formGroup w-50">
                                <label>District</label>
                                <input type="text" value="Galle" disabled />
                            </div>

                            <div className="formGroup w-50">
                                <label>Postal Code</label>
                                <input type="text" value="80320" disabled />
                            </div>
                        </div>

                        <div className="formGroup">
                            <label>Permanent Address</label>
                            <textarea value="83/A, Lewduva, Meetiyagoda, Ambalangoda." disabled />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserForm;
