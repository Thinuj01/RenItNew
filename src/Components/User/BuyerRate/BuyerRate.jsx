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
          <span className="ratingScore">{rating.toFixed(1)}</span><br />
          <span className="ratingText">{totalUsers} Users were rated</span><br />
          <a href="#" className="feedbackLink">View more feedback &gt;</a>
        </div>
      </div>

      <div className="horizontalLine"></div>

      {/* Purchased and Upcoming Items Section */}
      <div className="itemsSection">
        <div className="totalItems">
          <h3>Total purchased items</h3>
          <div className="itemCount">25</div>
        </div>

        <div className="verticalLine"></div>

        <div className="upcomingItems">
          <h3>Upcoming time period end items</h3>
          <div className="subTopics">
            <h4>Name</h4>
            <h4>Remaining time</h4>
            <h4>Get More time</h4>
          </div>

          <div className="itemRowScroller">
            {/* Sample items, consider mapping through a list */}
            {[
              { name: "Item 01", remainingTime: "24 h : 25 m : 30 s" },
              { name: "Item 02", remainingTime: "23 h : 15 m : 20 s" },
              { name: "Item 03", remainingTime: "22 h : 05 m : 10 s" },
              { name: "Item 04", remainingTime: "20 h : 45 m : 40 s" },
            ].map((item, index) => (
              <div className="itemRow" key={index}>
                <span className="itemName">{item.name}</span>
                <span className="remainingTime">{item.remainingTime}</span>
                <a href="#" className="exceedLink">Exceed period &gt;</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRate;
