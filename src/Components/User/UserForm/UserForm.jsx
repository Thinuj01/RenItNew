import React from 'react';
import './UserForm.css';
import { useState, useEffect } from 'react';
import axios from "axios";

function UserForm({ isBuyer, handleToggle }) {

    const [data, setData] = useState([]);
    const [sessiondata, setSessionData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:80/RentIT/Controllers/getSessionValueController.php`, {
          withCredentials: true
        })
          .then(response => {
            const data = response.data;
            setSessionData(data);
          });
      }, []);

      useEffect(() => {
        let isMounted = true;
        if (sessiondata['NIC']) {
          axios.post('http://localhost:80/RentIT/Controllers/userDetailsController.php', { nic: sessiondata['NIC'] })
            .then((res) => {
              if (isMounted) {
                console.log(res.data);
                setData(res.data);
              }
            });
        }
        return () => { isMounted = false; }; // Cleanup
      }, [sessiondata]);

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
                            <input type="text" value={data[0]?.first_name || ''} disabled />
                        </div>

                        <div className="dob_and_gender flexRow">
                            <div className="formGroup w-50">
                                <label>Date of Birth</label>
                                <input type="text" value={data[0]?.DOB || ''} disabled />
                            </div>
                            <div className="formGroup w-50">
                                <label>Gender</label>
                                <input type="text" value={data[0]?.gender || ''} disabled />
                            </div>
                        </div>

                        <div className="district_and_postal flexRow">
                            <div className="formGroup w-50">
                                <label>District</label>
                                <input type="text" value={data[0]?.district || ''} disabled />
                            </div>

                            <div className="formGroup w-50">
                                <label>Postal Code</label>
                                <input type="text" value={data[0]?.postal_code || ''} disabled />
                            </div>
                        </div>

                        <div className="formGroup">
                            <label>Permanent Address</label>
                            <textarea value={data[0]?.permanent_address || ''} disabled />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserForm;
