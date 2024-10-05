import React from 'react'
import './Orderpage.css'
import ProductInfo from '../ProductInfo/ProductInfo'
import OrderFeedback from '../OrderFeedback/OrderFeedback'
import OrderTable from '../OrderTable/OrderTable'
import HeaderContent from '../../HeaderContent/HeaderContent'

function OrderPage() {
  return (
    <>
    <HeaderContent />
        <div className="orderpageContainer">
            <div className="upper">
                <div className="orderpage-leftdiv">
                    <ProductInfo />
                </div>
                <div className="orderpage-rightdiv">
                    <OrderFeedback />
                </div>      
                
            </div>
            <div className="bottom">
                <OrderTable />
            </div>
        </div>
    </>
  )
}

export default OrderPage
