import React from 'react';
import './CommonFields.css'

function CommonFields({ formData, selectedDistrict, pcode, paddress, setFormData, setSelectedDistrict, setPcode, setPaddress }) {

    return (
        <>
            <div className="commonFieldsContainer">
                <div className="itemTitle">
                    <input
                        type="text"
                        name="title"
                        onChange={setFormData}
                        placeholder="Title"
                        value={formData.title||''}
                        required
                    />
                </div>
                <div className="itemDescription">
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={setFormData}
                        value={formData.description||''}
                        required
                    ></textarea>
                </div>
                <div className="district_postal">
                    <select
                        name="selectedDistrict"
                        id="iDistrict"
                        value={formData.selectedDistrict||''}
                        onChange={setFormData}
                    >
                        <option value="">District</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Matara">Matara</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Vavuniya">Vavuniya</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Mullaitivu">Mullaitivu</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Galle">Galle</option>
                        <option value="Kegalle">Kegalle</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                        <option value="Matale">Matale</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Jaffna">Jaffna</option>
                    </select>
                    <input
                        type="text"
                        name="pcode"
                        placeholder="Postal code"
                        id="iPostal"
                        value={formData.pcode||''}
                        onChange={setFormData}
                    />
                </div>
                <div className="permanentAddress">
                    <input
                        type="text"
                        name="paddress"
                        placeholder="Item Address"
                        id="iAddress"
                        value={formData.paddress||''}
                        onChange={setFormData}
                    />
                </div>
            </div>
        </>
    );
}

export default CommonFields;
