import React from 'react';
import { CiHeart } from "react-icons/ci";
import './ItemCard.css';

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
          {item.subcategories && (
            <ul className="item-subcategories">
              {item.subcategories.map((subcategory, index) => (
                <li key={index} className="item-subcategory">{subcategory}</li>
              ))}
            </ul>
          )}
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
