import React from 'react'
import './SignUpPage.css'
import WelcomeQuotes from '../WelcomeQuotes/WelcomeQuotes'
import SignUpForm from '../SignUpForm/SignUpForm'
import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <>
        <div id='signUpPageContainer'>
            <div className="leftDiv">
                <WelcomeQuotes title="Become a member" text="Sign up and start your rental journey today!"/>
            </div>

            <div className="rightDiv">
                <SignUpForm/>
            </div>
        </div>
    </>
  )
}

export default SignUpPage
