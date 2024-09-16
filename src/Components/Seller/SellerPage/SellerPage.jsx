import React from 'react'
import SellerForm from '../SellerForm/SellerForm'
import Rating from '../SellerRating/Rating'
import './SellerPage.css'
import SideMenu from '../SideMenu/SideMenu'
import HeaderContent from '../../HeaderContent/HeaderContent'


function SellerPage() {
  return (
    <div>
      <HeaderContent/>
      <div className="first-container">
        <div className="formSection widthSetter">
          <SellerForm/>
        </div>
        <div className="ratingSection widthSetter">
          <Rating/>
        </div>
      </div>
      <div className="category-pane">
        <div className="sidebar">
          <SideMenu/>
        </div>
        <div className="item-section">
          
        </div>
      </div>
      
    </div>
  )
}

export default SellerPage