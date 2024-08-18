import React from 'react'
import './ForgotPswdForm.css'

import { Link } from 'react-router-dom'

function ForgotPswdForm() {
    return (
        <>
            <div className="forgotPswdFormContainer">
                <div className="forgotPswdTitle">Forgot password?</div>

                <div className="remindText">
                    Don't worry! It happens. Please verify your account initially.
                </div>

                <div className="forgotPswdForm">
                    <form action="">
                        <div className="eMailDiv">
                            <input type="email" name="userEmail" placeholder="Email Address" id="uEmail" />
                            <button className="emailVerifyBtn">
                                Send OTP
                            </button>
                        </div>

                        <div className="eMailDivWithMessage">
                            <div className="eMailDiv">
                                <input type="text" name="emailOtp" placeholder="OTP code" id="eOtp" />
                                <button className="emailVerifyBtn" >Submit</button>
                            </div>

                            <div className="onChangeMessageContainer">
                                {/* {isOtpVerified ? <span className="confirmMark">&#10004;</span> : <span className="confirmMark">&#10007;</span>} */}
                            </div>
                        </div>

                        <div className="verifyPswd">
                            <div className="onChangeMessageContainer uPSWD">
                                <input type="password" name="userPswd" placeholder="Enter new password" className="uPSWD" />
                                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                            </div>

                            <div className="onChangeMessageContainer uPSWD">
                                <input type="password" name="confirmPswd" placeholder="Confirm new password" className="uPSWD" />
                                {/* {mError && <p style={{ color: 'red' }}>{mError}</p>} */}
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
