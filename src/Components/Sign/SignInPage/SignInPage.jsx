import React from 'react'
import './SignInPage.css'
import WelcomeQuotes from '../WelcomeQuotes/WelcomeQuotes'
import SignInForm from '../SignInForm/SignInForm'

function SignInPage() {
  return (
    <>
        <div id='signInPageContainer'>
            <div className="leftDiv">
                <WelcomeQuotes title="Welcome Back!" text="Sign in to access your account."/>
            </div>

            <div className="rightDiv">
                <SignInForm/>
            </div>
        </div>
    </>
  )
}

export default SignInPage
