import React from 'react';
import './OrderFeedback.css';

function OrderFeedback({ item }) {
  const rating = item.rating;
  const fullStars = Math.floor(rating); // Full stars based on the integer part of the rating
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if the rating has a decimal part >= 0.5
  const emptyStars = 5 - fullStars - halfStars; // Empty stars to complete the 5-star rating

  return (
    <div className="orderfeedbackbox">
      <div className="orderstars">
        <h1 className="star ordergreen-star">{rating.toFixed(1)}</h1>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={i} className="star ordergreen-star">★</span>
          ))}
        {halfStars === 1 && <span className="star ordergreen-star">☆</span>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={i} className="star ordergrey-star">★</span>
          ))}
      </div>
    </div>
  );
}

export default OrderFeedback;
