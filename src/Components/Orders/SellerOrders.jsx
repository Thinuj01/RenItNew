import React from 'react'
import './SellerOrders.css'
import OrderItemPreview from './OrderItemPreview'
import ProductTable from './ProductTable'
import HeaderContent from '../HeaderContent/HeaderContent'

function SellerOrders() {
  return (
    <div>
        <HeaderContent/>
        <div className='ItemPreview'>
            <OrderItemPreview/>
        </div>
        <div className="seller-navigation">
          <button>Order</button>
          <button></button>
        </div>
        <div className='productTable'>
            <ProductTable/>
        </div>
    </div>
  )
}

export default SellerOrders