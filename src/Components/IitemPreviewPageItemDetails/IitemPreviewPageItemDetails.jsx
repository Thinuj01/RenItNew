import React from 'react'
import './IitemPreviewPageItemDetails.css'

function IitemPreviewPageItemDetails() {
    return (
        <>
            <div className="itemPreviewPageItemDetails">
                <div className="itemPreviewPageItemName">
                    <p>Apple iPhone 13 A2482 128GB Network Unlocked Very Good Condition Unlocked Very Good Condition</p>
                </div>

                <div className="itemPreviewPageItemPrice">
                    <strong>4000.00 LKR</strong>
                </div>

                <div className="availabilityAndCondition">
                    <div className="availabilitiDiv labelItemDetails">
                        <strong>In Availble</strong>
                    </div>

                    <div className="conditionDiv labelItemDetails">
                        <strong>Good</strong>
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
