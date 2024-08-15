import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import { Link } from 'react-router-dom';

function SignUpForm() {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    populateYearDropdown();
    populateMonthDropdown();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      populateDayDropdown(daysInMonth);
    }
  }, [selectedYear, selectedMonth]);

  const populateYearDropdown = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      yearsArray.push(i);
    }
    setYears(yearsArray);
  };

  const populateMonthDropdown = () => {
    const monthsArray = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    setMonths(monthsArray);
  };

  const populateDayDropdown = (daysInMonth) => {
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setDays(daysArray);
  };

  const handleSelectChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const getSelectStyle = (selectedValue) => {
    return selectedValue === '' ? { color: '#A5A5A5' } : { color: '#333' };
  };

  return (
    <>
      <div id="signUpFormContainer">
        <div className="signUpTitle">Sign up</div>

        <div className="remindText">
          Be sure to get the correct information. Otherwise your account will be disabled.
        </div>

        <div className="signUpForm">
          <form action="">
            <div className="first_last_name">
              <input type="text" name="userFirstName" placeholder="First Name" className="name" />
              <input type="text" name="userLastName" placeholder="Last Name" className="name" />
            </div>

            <div className="nicNumber">
              <input type="text" name="userNIC" placeholder="NIC number" />
            </div>

            <div className="dob_gender">
              <div className="dob">
                <select
                  name="dobYear"
                  className="dobInput"
                  id="dobYear"
                  value={selectedYear}
                  onChange={handleSelectChange(setSelectedYear)}
                  style={getSelectStyle(selectedYear)}
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  name="dobMonth"
                  className="dobInput"
                  id="dobMonth"
                  value={selectedMonth}
                  onChange={handleSelectChange(setSelectedMonth)}
                  style={getSelectStyle(selectedMonth)}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
                <select
                  name="dobDay"
                  className="dobInput"
                  id="dobDay"
                  value={selectedDay}
                  onChange={handleSelectChange(setSelectedDay)}
                  style={getSelectStyle(selectedDay)}
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="gender" id="uGender">
                <select
                  name="userGender"
                  value={selectedGender}
                  onChange={handleSelectChange(setSelectedGender)}
                  style={getSelectStyle(selectedGender)}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="district_postal">
              <select
                name="userDistrict"
                id="uDistrict"
                value={selectedDistrict}
                onChange={handleSelectChange(setSelectedDistrict)}
                style={getSelectStyle(selectedDistrict)}
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
              <input type="text" name="userPostal" placeholder="Postal code" id="uPostal" />
            </div>

            <div className="permanentAddress">
              <input type="text" name="userAddress" placeholder="Permanent Address" id="uAddress" />
            </div>

            <div className="eMailDiv">
              <input type="email" name="userEmail" placeholder="Email Address" id="uEmail" />
              <button className="emailVerifyBtn">Send OTP</button>
            </div>

            <div className="eMailDiv">
              <input type="text" name="emailOtp" placeholder="OTP code" id="eOtp" />
              <button className="emailVerifyBtn">Submit</button>
            </div>

            <div className="mobile_number">
              <input type="text" name="userMobile" placeholder="Mobile number" id="uMobile" />
            </div>

            <div className="verifyPswd">
              <input type="password" name="userPswd" placeholder="Password" className="uPSWD" />
              <input type="password" name="confirmPswd" placeholder="Confirm password" className="uPSWD" />
            </div>

            <input type="submit" name="submit" value="Sign in" />

            <div className="signInQ">
              <p>Already a member? <Link to="/signin">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
