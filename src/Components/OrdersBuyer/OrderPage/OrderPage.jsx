import React from 'react'
import './Orderpage.css'
import ProductInfo from '../ProductInfo/ProductInfo'
import OrderFeedback from '../OrderFeedback/OrderFeedback'
import OrderTable from '../OrderTable/OrderTable'
import HeaderContent from '../../HeaderContent/HeaderContent'
import { useLocation } from 'react-router-dom';
import Footer from '../../Footer/Footer'

function OrderPage() {
    const location = useLocation();
    const { item } = location.state || {};
  return (
    <>
    <HeaderContent />
        <div className="orderpageContainer">
            <div className="upper">
                <div className="orderpage-leftdiv">
                    <ProductInfo item={item}/>
                </div>
                <div className="orderpage-rightdiv">
                    <OrderFeedback />
                </div>      
                
            </div>
            <div className="bottom">
                <OrderTable item={item} />
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default OrderPage
