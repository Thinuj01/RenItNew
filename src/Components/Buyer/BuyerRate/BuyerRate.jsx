import React, { useState } from 'react';
import './BuyerRate.css'


function BuyerRate() {
  return (
    <div className="buyerRateContainer">
      {/* Rating Section */}
        <div className="buyer-rating-section">
            <div className="left">
                <div className="buyer-stars">
                    <span className="star green">&#9733;</span>
                    <span className="star green">&#9733;</span>
                    <span className="star green">&#9733;</span>
                    <span className="star green">&#9733;</span>
                    <span className="star">&#9733;</span>
                </div>
            </div>
                
            <div className="rating">
              <span className="rating-score">4.5</span><br/>
              <span className="rating-text">5 Users were rated</span><br/>
              <a href="#" className="feedback">View more feedback &gt;</a>
            </div>                          
            
        </div>    
        

      {/* Purchased and Upcoming Items Section */}
      <div className="items-section">
        <div className="total-items">
          <h3>Total purchased items</h3>
          <div className="item-count">25</div>
        </div>

        <div className="upcoming-items">
          <h3>Upcoming time period end items</h3>
          <div className="sub-topics">
            <h4>Name</h4>
            <h4>Remaining time</h4>
            <h4>More time</h4>
          </div>
          <div className="item">
            <span className="item-name">Item 01</span>
            <span className="remaining-time">24 h : 25 m : 30 s</span>
            <a href="#" className="exceed-link">Exceed period &gt;</a>
          </div>
          <div className="item">
            <span className="item-name">Item 02</span>
            <span className="remaining-time">24 h : 25 m : 30 s</span>
            <a href="#" className="exceed-link">Exceed period &gt;</a>
          </div>
          <div className="item">
            <span className="item-name">Item 03</span>
            <span className="remaining-time">24 h : 25 m : 30 s</span>
            <a href="#" className="exceed-link">Exceed period &gt;</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerRate
