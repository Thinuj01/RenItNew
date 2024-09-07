import React from 'react'
import './ItemPreviewPage.css'
import ToggleableSection from '../ToggleableSection/ToggleableSection'

function ItemPreviewPage() {
    return (
        <>
            <div className="ItemPreviewPageContainer">
                <div className="leftDiv">

                </div>

                <div className="rightDiv">
                    <ToggleableSection title="Shipping Method:">
                        <p><strong>Seller-Managed:</strong> The seller handles the shipping process for both delivery and return.</p>
                        <p><strong>Cost Responsibility:</strong> Shipping costs may be covered by either the buyer or the seller, depending on the seller’s policy. Specific details can be found on the item page.</p>
                        <p><strong>Delivery Options:</strong> Sellers may offer various shipping options, including 24-hour delivery windows.</p>
                    </ToggleableSection>
                </div>
            </div>
        </>
    )
}

export default ItemPreviewPage
