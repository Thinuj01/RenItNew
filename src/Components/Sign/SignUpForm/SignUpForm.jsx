import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpForm({ isRegistered, setIsRegistered }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [NICnumber, setNICnumber] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [pcode, setpcode] = useState("");
  const [paddress, setpaddress] = useState("");
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [status, setstatus] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [phoneN, setphoneN] = useState("");
  const [password, setpassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [mError, setmError] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();


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

  const handleChangeNIC = (e) => {
    setNICnumber(e.target.value);

    if (validateNIC(e.target.value)) {

    } else {

    }

  };

  function validateNIC(nic) {
    if (nic.length === 10) {
      return validateOldNIC(nic);
    } else if (nic.length === 12) {
      return validateNewNIC(nic);
    } else {
      return false;
    }
  }

  function validateOldNIC(nic) {
    const oldNicPattern = /^[0-9]{9}[VXvx]$/;
    if (!oldNicPattern.test(nic)) {
      return false;
    }

    const year = parseInt(nic.substring(0, 2));
    const adjustedYear = year < 20 ? 2000 + year : 1900 + year;
    setSelectedYear(adjustedYear);

    let dayOfYear = parseInt(nic.substring(2, 5));
    const isFemale = dayOfYear > 500;
    if (isFemale) dayOfYear -= 500;

    setDayAndMonthFromDayOfYear(adjustedYear, dayOfYear);
    setSelectedGender(isFemale ? "Female" : "Male");

  }

  function validateNewNIC(nic) {
    const newNicPattern = /^[0-9]{12}$/;
    if (!newNicPattern.test(nic)) {
      return false;
    }

    const year = parseInt(nic.substring(0, 4));
    setSelectedYear(year);

    let dayOfYear = parseInt(nic.substring(4, 7));
    const isFemale = dayOfYear > 500;
    if (isFemale) dayOfYear -= 500;

    setDayAndMonthFromDayOfYear(year, dayOfYear);
    setSelectedGender(isFemale ? "Female" : "Male");

  }

  function setDayAndMonthFromDayOfYear(year, dayOfYear) {
    const date = new Date(year, 0);
    date.setDate(dayOfYear);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    setSelectedMonth(month);
    setSelectedDay(day);
  }

  const handleChangefname = (e) => {
    setfname(e.target.value);
  };

  const handleChangelname = (e) => {
    setlname(e.target.value);
  };

  const handleChangePcode = (e) => {
    setpcode(e.target.value);
  };

  const handleChangePaddress = (e) => {
    setpaddress(e.target.value);
  };

  const handleChangeEmail = async (e) => {
    setemail(e.target.value);
    // setstatus('1');
    console.log("3");
    setIsSubmitting(false);

  };

  const sendMail = async (e) => {
    const newStatus = '1';
    setstatus(newStatus);
    console.log(newStatus);
    setIsSendingEmail(true);
    try {
      const response = await axios.post('http://localhost:80/RentIT/Controllers/userRegistrationController.php', { email, newStatus }, { withCredentials: true });
      console.log('Email sent successfully:', response.data);
      setIsSubmitting(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(true);

    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleChangeOTP = (e) => {
    setotp(e.target.value);

  }

  const confirmOTP = async (e) => {
    const newStatus = '2';
    setstatus(newStatus);
    console.log(newStatus);
    try {
      const response = await axios.post('http://localhost:80/RentIT/Controllers/userRegistrationController.php', { otp, newStatus }, { withCredentials: true });
      console.log('Email Verification:', response.data);
      if (response.data == "Matched") {
        setIsOtpVerified(true);
      }
    } catch (error) {
      console.error('Error verification email:', error);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangephoneN = (e) => {
    setphoneN(e.target.value);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setpassword(newPassword);


    const validationError = validatePassword(newPassword);
    setError(validationError);

  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  const handleChangecPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setcPassword(newConfirmPassword);
    const check = validatetwopasswords(newConfirmPassword, password);
    setmError(check);

  };

  const validatetwopasswords = (cPassword, password) => {
    console.log(cPassword);
    if (cPassword === password) {
      return "Matched";
    } else {
      return "Not Matched";
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStatus = '3';
    setstatus(newStatus);
    console.log(newStatus);
    if (!isOtpVerified) {
      alert("Please verify the OTP before proceeding.");
      return;
    }
    const formData = {
      fname,
      lname,
      NICnumber,
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedGender,
      selectedDistrict,
      pcode,
      paddress,
      email,
      phoneN,
      password,
      newStatus,
      otp
    };

    try {
      const response = await axios.post('http://localhost:80/RentIT/Controllers/userRegistrationController.php', formData, { withCredentials: true });
      console.log('Registration successful:', response.data);
      if (response.data == "Registration Successfull") {
        alert('Registration successful!');
        setIsRegistered(true);
      } else {
        alert('Registration unsuccessful!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div id="signUpFormContainer">
        <div className="signUpTitle">Sign up</div>

        <div className="remindText">
          Be sure to get the correct information. Otherwise your account will be disabled.
        </div>

        <div className="signUpForm">
          <form onSubmit={handleSubmit}>
            <div className="first_last_name">
              <input type="text" name="userFirstName" placeholder="First Name" className="name" value={fname} onChange={handleChangefname} />
              <input type="text" name="userLastName" placeholder="Last Name" className="name" value={lname} onChange={handleChangelname} />
            </div>

            <div className="nicNumber">
              <input type="text" name="userNIC" placeholder="NIC number" value={NICnumber} onChange={handleChangeNIC} />
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
                  <option value="Other">Other</option>
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
              <input type="text" name="userPostal" placeholder="Postal code" id="uPostal" value={pcode} onChange={handleChangePcode} />
            </div>

            <div className="permanentAddress">
              <input type="text" name="userAddress" placeholder="Permanent Address" id="uAddress" value={paddress} onChange={handleChangePaddress} />
            </div>

            <div className="eMailDiv">
              <input type="email" name="userEmail" placeholder="Email Address" id="uEmail" value={email} onChange={handleChangeEmail} />
              <button className="emailVerifyBtn" disabled={isSubmitting} onClick={(e) => { e.preventDefault(); sendMail(); }}>
                {isSendingEmail ? <span className="loadingSpinner"></span> : "Send OTP"}
              </button>
            </div>

            <div className="eMailDivWithMessage">
              <div className="eMailDiv">
                <input type="text" name="emailOtp" placeholder="OTP code" id="eOtp" value={otp} onChange={handleChangeOTP} />
                <button className="emailVerifyBtn" onClick={(e) => { e.preventDefault(); confirmOTP(); }}>Submit</button>
              </div>

              <div className="onChangeMessageContainer">
                {isOtpVerified ? <span className="confirmMark">&#10004;</span> : <span className="confirmMark">&#10007;</span>}
              </div>

            </div>


            <div className="mobile_number">
              <input type="text" name="userMobile" placeholder="Mobile number" id="uMobile" value={phoneN} onChange={handleChangephoneN} />
            </div>

            <div className="verifyPswd">
              <div className="onChangeMessageContainer uPSWD">
                <input type="password" name="userPswd" placeholder="Password" className="uPSWD" value={password} onChange={handleChangePassword} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div className="onChangeMessageContainer uPSWD">
                <input type="password" name="confirmPswd" placeholder="Confirm password" className="uPSWD" vlaue={cPassword} onChange={handleChangecPassword} />
                {mError && <p style={{ color: 'red' }}>{mError}</p>}
              </div>

            </div>

            <input type="submit" name="submit" value="Sign Up" />

            <div className="signInQ">
              <p>Already a member? <Link to="/signin">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
