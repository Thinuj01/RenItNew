import React from 'react'
import './ProductInfo.css'

function ProductInfo() {
  return (
    <>
    <div className="product-info">
    
      <div className="image-box">      
        {/* Image */}
      </div>

    {/* Details */}
      <div className="info-text">
        <p><strong>Name:</strong></p>
        <p><strong>Location:</strong> </p>
        <p><strong>Item Category:</strong></p>
        <p><strong>Sub Category:</strong> </p>
      </div>

    </div>
    </>
  )
}

export default ProductInfo
