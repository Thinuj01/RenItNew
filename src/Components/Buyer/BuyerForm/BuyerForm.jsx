import React, { useState } from 'react';
import './BuyerForm.css'

function BuyerForm() {

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Arrays for years, months, and days 
    const years = [...Array(100).keys()].map(i => new Date().getFullYear() - i);
    const months = [...Array(12).keys()].map(i => new Date(0, i).toLocaleString('en', { month: 'long' }));
    const days = [...Array(31).keys()].map(i => i + 1);

    // Handle change function
    const handleSelectChange = (setStateFunction) => (event) => {
        setStateFunction(event.target.value);
    };
    
    return (
        <>
            <div className="buyerFormContainer">
                <div className="photo-edit">
                    <div className="profile-photo"></div>

                    <div className="toggle-button">
                        <input type="checkbox" id="buyerSellerToggle" name="buyerSellerToggle" />
                        <label for="buyerSellerToggle"></label>
                        <h2>Buyer</h2>
                    </div>

                    <input type="button" id="bButton" value="Add Image" />
                </div>

                <div className="buyerForm">
                    <form>
                        <div className="buyer_fullname">
                            <label for="userFullName">Full Name</label><br />
                            <input type="text" name="userFullName" placeholder="Full Name" className="buyerName input" />
                        </div>


                        <div className="buyer_dob_gender">
                            <div className="buyer_dob label-and-input">
                                <label for="dob">Date Of Birth</label>
                                <div style={{ display: 'flex' }}>
                                    <select
                                        name="dobYear"
                                        className="buyer_dobInput input"
                                        id="buyer_dobYear"
                                        value={selectedYear}
                                        onChange={
                                            handleSelectChange(setSelectedYear)
                                        }
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        <option value="">Year</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="dobMonth"
                                        className="buyer_dobInput input"
                                        id="buyer_dobMonth"
                                        value={selectedMonth}
                                        onChange={
                                            handleSelectChange(setSelectedMonth)}
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        <option value="">Month</option>
                                        {months.map((month, index) => (
                                            <option key={index} value={index + 1}>{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="dobDay"
                                        className="buyer_dobInput input"
                                        id="buyer_dobDay"
                                        value={selectedDay}
                                        onChange={
                                            handleSelectChange(setSelectedDay)}
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        <option value="">Day</option>
                                        {days.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="buyer_gender label-and-input">
                                <label for="userGender">Gender</label>
                                <select
                                    name="buyeruserGender"
                                    className="input"
                                    id="buyer_uGender"
                                    value={selectedGender}
                                    onChange={
                                        handleSelectChange(setSelectedGender)}
                                    style={{ paddingLeft: '20px' }}
                                >
                                    <option value="" >Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>
                        </div>


                        <div className="buyer_districtPostal">
                            <div className="buyer_district">
                                <label for="userDistrict">District</label>
                                <select
                                    name="buyeruserDistrict"
                                    id="buyer_uDistrict"
                                    className="input"
                                    value={selectedDistrict}
                                    onChange={
                                        handleSelectChange(setSelectedDistrict)
                                    }
                                    style={{ paddingLeft: '20px' }}
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
                            </div>

                            <div className="buyer_postal">
                                <label for="userPostal">Postal Code</label>
                                <input type="text" name="userPostal" placeholder="Postal code" id="uPostal" className='input' />
                            </div>
                        </div>

                        <div className="buyer_permanentAddress">
                            <label for="userAddress">Permanent Address</label>
                            <input type="text" name="userAddress" placeholder="Permanent Address" id="uAddress" className='input' />
                        </div>

                    </form>
                </div>
            </div>



        </>
    )
}

export default BuyerForm