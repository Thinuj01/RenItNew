import React from 'react'
import './BuyerPage.css'
import BuyerForm from '../BuyerForm/BuyerForm'
import { Link } from 'react-router-dom'
import BuyerRate from '../BuyerRate/BuyerRate'
import BuyerLinks from '../BuyerLinks/BuyerLinks'



function BuyerPage() {
  return (
    <>
    <div className="buyerPageContainer">

      <div className="upperContainer">
          <div className="buyer_leftDiv">
              <BuyerForm/>
          </div>
          <div className= "buyer_rightDiv">
              <BuyerRate/>
          </div>
      </div>
      
      <div className="lowerContainer">
        <div className="lowerLeft">
          <BuyerLinks/>
        </div>
      </div>

    </div>
    
    
    </>
  )
}

export default BuyerPage
