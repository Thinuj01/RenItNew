import React, { useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import './ItemCard.css';
import { CiLocationOn } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom'

function ItemCard({ item , paths}) {
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(item);
  },[paths]);
  return (
    <>
      <div className="item-card" onClick={()=>{
        navigate("/ItemPreviewPage",{state:{id:paths.item_id}});
      }}> 

        <div className="item-image">
          <img src={paths?'http://localhost:80/RentIT'+paths.item_Picture_01:item.imageUrl} alt={paths?paths.title:item.name} />
        </div>

        <div className="item-details">
          <h3 className="item-name">{paths?paths.title:item.name}</h3>
      
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
