import React from 'react'
import './WelcomeQuotes.css'
import logoB from '/logob.png'
import { Link } from 'react-router-dom'

function WelcomeQuotes(props) {
  return (
    <div id='welcomeQuotesContainer'>
      <div className="welocmeLogo">
        <Link to='/'><img src={logoB} alt="Go to HomePage" /></Link>
      </div>
      <div className="welcomeTitle">
        {props.title}
      </div>
      <div className="welcomeText">
        {props.text}
      </div>
    </div>
  )
}

export default WelcomeQuotes
