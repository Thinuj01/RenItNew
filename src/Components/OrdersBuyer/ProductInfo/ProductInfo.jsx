import React, { useEffect, useState } from 'react'
import './ProductInfo.css'
import { json } from 'react-router-dom';

function ProductInfo({ item }) {
  let subcategoriesArray = JSON.parse(item.subcategories);

  let subcategoriesString = subcategoriesArray.join(", ");

  return (
    <>
      <div className="product-info">

        <div className="image-box">
          <img src={item.imageUrl} className='product-image'/>
        </div>

        {/* Details */}
        <div className="info-text">
          <p><strong>Name: </strong>{item.name}</p>
          <p><strong>Location: </strong> </p>
          <p><strong>Item Category: </strong>{item.category}</p>
          <p><strong>SubCategories: </strong>{subcategoriesString} </p>
        </div>

      </div>
    </>
  )
}

export default ProductInfo
