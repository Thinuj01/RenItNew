import React from 'react'
import './IitemPreviewPageItemDetails.css'

function IitemPreviewPageItemDetails({fetch=[]}) {
    const item = fetch.length > 0 ? fetch[0] : {};
    return (
        <>
            <div className="itemPreviewPageItemDetails">
                <div className="itemPreviewPageItemName">
                    <p>{item.title ? item.title : "Title"}</p>
                </div>

                <div className="itemPreviewPageItemPrice">
                    <strong>{item.rental_price ? item.rental_price : "Price"}.00 LKR</strong>
                </div>

                <div className="availabilityAndCondition">
                    <div className="availabilitiDiv labelItemDetails">
                        <strong>{item.availability=="available"?"Available":"Not-Available"}</strong>
                    </div>

                    <div className="conditionDiv labelItemDetails">
                        <strong>{item.item_condition}</strong>
                    </div>
                </div>

                <div className="shippingOrPickup">
                    <div className="shippingiDiv labelItemDetails">
                        <strong>Free Shipping</strong>
                    </div>

                    <div className="pickupDiv labelItemDetails">
                        <strong>Pickup Have</strong>
                    </div>
                </div>
            </div>

        </>
    )
}

export default IitemPreviewPageItemDetails
