import React, { useState } from 'react'
import './SignUpPage.css'
import WelcomeQuotes from '../WelcomeQuotes/WelcomeQuotes'
import SignUpForm from '../SignUpForm/SignUpForm'
import ProofSubmissionForm from '../ProofSubmissionForm/ProofSubmissionForm'

function SignUpPage() {
  const[isRegistered,setIsRegistered] = useState(false);
  return (
    <>
        <div id='signUpPageContainer'>
            <div className="leftDiv">
                <WelcomeQuotes title="Become a member" text="Sign up and start your rental journey today!"/>
            </div>

            <div className="rightDiv">
              {isRegistered?<ProofSubmissionForm/>:<SignUpForm isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>}
            </div>
        </div>
    </>
  )
}

export default SignUpPage
