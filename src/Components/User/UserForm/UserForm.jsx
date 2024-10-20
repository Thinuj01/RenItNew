import React, { useState, useEffect } from 'react';
import './UserForm.css';
import axios from "axios";

function UserForm({ isBuyer, handleToggle }) {
    const [data, setData] = useState([]);
    const [sessionData, setSessionData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null); // State to hold selected image
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, { withCredentials: true })
            .then(response => {
                setSessionData(response.data);
            })
            .catch(err => {
                setError('Error fetching session data');
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (sessionData['NIC']) {
            setLoading(true);
            axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php', {
                params: { status: "1", nic: sessionData['NIC'] }
            })
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                    console.log(res.data);
                })
                .catch(err => {
                    setError('Error fetching user details');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [sessionData]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const handleUpload = () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);
        formData.append('nic', sessionData['NIC']); // Assuming you want to associate the image with the user

        axios.post('http://localhost:4433/RentIT/Controllers/uploadProfilePicController.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then(response => {
                console.log('Image uploaded successfully:', response.data);
                setUploadSuccess(true);
                setImage(null);
            })
            .catch(err => {
                console.error('Error uploading image:', err);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const userDetails = data[0] || {};

    return (
        <div className="userFormContainer">
            <div className="userFormContainerLeft">
            <div className="userProfilePic">
                {imagePreview ? (
                    // Show the preview of the newly selected image
                    <img
                        src={imagePreview}
                        alt="Preview of User Profile"
                        id="profileImage"
                        className="profileImage"
                    />
                ) : (
                    // Show the existing profile picture or a default image
                    <img
                        src={userDetails.profile_picture
                            ? 'http://localhost:4433/RentIT/' + userDetails.profile_picture.slice(2)
                            : (userDetails.gender === "Male" 
                                ? "http://localhost:4433/RentIT/images/ProfileImages/male.jpg" 
                                : "http://localhost:4433/RentIT/images/ProfileImages/female.jpg")}
                        alt="User Profile"
                        id="profileImage"
                        className="profileImage"
                    />
                )}
            </div>

                <div className="userProfilePicAddButton">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="addImageButton">Add Image</label>
                </div>

                {uploadSuccess && <p className="successMessage">Profile picture updated successfully!</p>}
                {!uploadSuccess && image && (
                    <button type="button" onClick={handleUpload} className="uploadButton">
                        Upload
                    </button>
                )}

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

            <div className="userFormContainerRight">
                <form className="userForm">
                    <div className="formGroup">
                        <label>Name</label>
                        <input type="text" value={userDetails.first_name || ''} disabled />
                    </div>

                    <div className="dob_and_gender flexRow">
                        <div className="formGroup w-50">
                            <label>Date of Birth</label>
                            <input type="text" value={userDetails.DOB || ''} disabled />
                        </div>
                        <div className="formGroup w-50">
                            <label>Gender</label>
                            <input type="text" value={userDetails.gender || ''} disabled />
                        </div>
                    </div>

                    <div className="district_and_postal flexRow">
                        <div className="formGroup w-50">
                            <label>District</label>
                            <input type="text" value={userDetails.district || ''} disabled />
                        </div>

                        <div className="formGroup w-50">
                            <label>Postal Code</label>
                            <input type="text" value={userDetails.postal_code || ''} disabled />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label>Permanent Address</label>
                        <textarea value={userDetails.permanent_address || ''} disabled />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
