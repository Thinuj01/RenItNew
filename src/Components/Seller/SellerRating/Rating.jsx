import React from 'react'
import './Rating.css'

function Rating() {
  return (
    <div>
      <div className="dashboard-summary">
        <div className="rating-section">
          <div className="stars">
            <span className="star filled">&#9733;</span>
            <span className="star filled">&#9733;</span>
            <span className="star filled">&#9733;</span>
            <span className="star filled">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <div className="rating-info">
            <div className="rating-value">4.0</div>
            <div className="rating-users">5 Users was rated</div>
            <a href="#" className="view-more">View more feedback</a>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-item border">
            <div className="summary-label">Total listed items</div>
            <div className="summary-value">25</div>     
          </div>
          <div className="summary-item border">
            <div className="summary-label">Total Earnings</div>
            <div className="summary-value">50$</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Pending Orders</div>
            <div className="summary-value">45</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rating