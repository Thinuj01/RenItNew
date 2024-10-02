import React, { useState, useEffect } from 'react';
import './ForgotPswdForm.css'
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom'

function ForgotPswdForm() {
    const [email, setemail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [otp, setotp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [password, setpassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [error, setError] = useState("");
    const [mError, setmError] = useState("");
    const navigate = useNavigate();

    const handleChangeEmail = async (e) => {
        setemail(e.target.value);
        console.log("3");
        setIsSubmitting(false);

    };

    const sendMail = async (e) => {
        const status = '2';
        console.log(status);
        setIsSendingEmail(true);
        try {
            const response = await axios.post('http://localhost:80/RentIT/Controllers/userLoginController.php', { email, status }, { withCredentials: true });
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
        const status = '3';
        console.log(status);
        try {
            const response = await axios.post('http://localhost:80/RentIT/Controllers/userLoginController.php', { otp, status }, { withCredentials: true });
            console.log('Email Verification:', response.data);
            if (response.data == "Matched") {
                setIsOtpVerified(true);
            }
        } catch (error) {
            console.error('Error verification email:', error);
        }
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
        const status = '4';
        console.log(status);
        if (!isOtpVerified) {
          alert("Please verify the OTP before proceeding.");
          return;
        }
        const formData = {
          email,  
          password,
          status,
        };
    
        try {
          const response = await axios.post('http://localhost:80/RentIT/Controllers/userLoginController.php', formData,{withCredentials:true});
          console.log('Password Changed:', response.data);
          if (response.data == "Password Changed") {
            alert('Password Changed');
            navigate('/signin');
          }else{
            alert('Password Not Changed');
          }
        } catch (error) {
          console.error('Error during password changing:', error);
          alert('Password Changing failed. Please try again.');
        }
      };

    return (
        <>
            <div className="forgotPswdFormContainer">
                <div className="forgotPswdTitle">Forgot password?</div>

                <div className="remindText">
                    Don't worry! It happens. Please verify your account initially.
                </div>

                <div className="forgotPswdForm">
                    <form onSubmit={handleSubmit}>
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

                        <div className="verifyPswd">
                            <div className="onChangeMessageContainer uPSWD">
                                <input type="password" name="userPswd" placeholder="Enter new password" className="uPSWD" value={password} onChange={handleChangePassword} />
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>

                            <div className="onChangeMessageContainer uPSWD">
                                <input type="password" name="confirmPswd" placeholder="Confirm new password" className="uPSWD" vlaue={cPassword} onChange={handleChangecPassword} />
                                {mError && <p style={{ color: 'red' }}>{mError}</p>}
                            </div>
                        </div>

                        <input type="submit" name="submit" value="Submit" />

                        <div className="signInQ">
                            <p>Remind password? <Link to="/signin">Try Again</Link></p>
                        </div>
                    </form>
                </div>

            </div>


        </>
    )
}

export default ForgotPswdForm
