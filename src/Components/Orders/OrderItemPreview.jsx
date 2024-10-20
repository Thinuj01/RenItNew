import React from 'react'
import './OrderItemPreview.css'

function OrderItemPreview() {
  return (
    <div className='container'>
        <div className="itemImage">
            
        </div>
        <div className="itemDetails">
            <table className='itemTable'>
                <tr>
                    <td>Item Name:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Item Description:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Item Category:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Item Price:</td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
  )
}

export default OrderItemPreview