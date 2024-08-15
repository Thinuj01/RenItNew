import React from 'react'
import './SignInForm.css'
import { Link } from 'react-router-dom'

function SignInForm() {
  return (
    <>
        <div id="signInFormContainer">
            <div className="signInTitle">
                Sign in
            </div>
            <div className="signInForm">
                <form action="">
                    <div className="name_pswd">
                        <input type="text" name='userName' placeholder='Email or NIC'/>
                        <input type="password" name="userPswd" placeholder='Password' id="" />
                    </div>

                    <div className="remember_fogot">
                        <div className="remberDiv">
                            <input type="checkbox" name="remberMe" id="" />
                            <label htmlFor="remberMe">Rember me</label>
                        </div>
                        <div className="forgotDiv">
                            <Link to=''>Forgot password</Link>
                        </div>
                    </div>

                    <input type="submit" name='submit' value="Sign in"/>

                    <div className="signUpQ">
                        <p>Don't you have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default SignInForm
