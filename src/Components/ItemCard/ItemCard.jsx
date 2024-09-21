import React from 'react';
import { CiHeart } from "react-icons/ci";
import './ItemCard.css';
import { CiLocationOn } from "react-icons/ci";

function ItemCard({ item }) {
  return (
    <>
      <div className="item-card">

        <div className="item-image">
          <img src={item.imageUrl} alt={item.name} />
        </div>

        <div className="item-details">
          <h3 className="item-name">{item.name}</h3>
      
          <p className="item-category">{item.category}</p>

          <div className="district_ratingValue">
      
            <div className="itemCardDistrict">
              <p><span><CiLocationOn /></span>Mathara</p>
            </div>
      
            <div className="itemCardRatingSection">
              <div className="itemCardRatingStars">
                <span className="itemCardRatingStar green">&#9733;</span>
              </div>
              <span className="itemCardRatingScore">4.5</span><br />
            </div>
      
          </div>
      
          <p className="item-price">Rs.{item.price}</p>
        </div>
      
        <div className="wishlist-button">
          <button onClick={() => addToWishlist(item)}>
            <CiHeart /> Add to Wishlist
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
