import React from 'react'
import './Rating.css'

function Rating() {
  return (
    <div>
      <div className="seller-dashboard-summary">
        <div className="seller-rating-section">
          <div className="seller-stars">
            <span className="seller-star filled">&#9733;</span>
            <span className="seller-star filled">&#9733;</span>
            <span className="seller-star filled">&#9733;</span>
            <span className="seller-star filled">&#9733;</span>
            <span className="seller-star">&#9733;</span>
          </div>
          <div className="seller-rating-info">
            <div className="seller-rating-value">4.0</div>
            <div className="seller-rating-users">5 Users was rated</div>
            <a href="#" className="view-more">View more feedback</a>
          </div>
        </div>

        <div className="seller-summary-section">
          <div className="seller-summary-item border">
            <div className="summary-label">Total listed items</div>
            <div className="summary-value">25</div>     
          </div>
          <div className="seller-summary-item border">
            <div className="summary-label">Total Earnings</div>
            <div className="summary-value">50$</div>
          </div>
          <div className="seller-summary-item">
            <div className="summary-label">Pending Orders</div>
            <div className="summary-value">45</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rating