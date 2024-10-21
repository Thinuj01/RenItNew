import React from 'react';
import './BuyerRate.css';

const BuyerRate = ({ rating, totalUsers }) => {
  const maxStars = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(
          <span key={i} className="star full">&#9733;</span>
        );
      } else if (i === Math.ceil(rating)) {
        // Partially filled star for the fractional part
        const decimalPart = rating % 1;
        stars.push(
          <span key={i} className="star fractional">
            <span className="starFull" style={{ width: `${decimalPart * 100}%` }}>&#9733;</span>
            <span className="starEmpty">&#9733;</span>
          </span>
        );
      } else {
        // Empty star
        stars.push(
          <span key={i} className="star empty">&#9733;</span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="buyerRateContainer">
      {/* Rating Section */}
      <div className="buyerRatingSection">
        <div className="leftSection">
          <div className="buyerStars">{renderStars()}</div>
        </div>

        <div className="ratingSection">
          <span className="ratingScore">{rating}</span><br />
          <span className="ratingText">{totalUsers} Users were rated</span><br />
          <a href="#" className="feedbackLink">View more feedback &gt;</a>
        </div>
      </div>

      <div className="horizontalLine"></div>

      {/* Purchased and Upcoming Items Section */}
      <div className="itemsSection">
        <div className="totalItems">
          <h3>Total purchased items</h3>
          <div className="itemCount">0</div>
        </div>

      </div>
    </div>
  );
};

export default BuyerRate;
