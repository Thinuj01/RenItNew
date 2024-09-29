import React from 'react'
import './SellerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import SellerTrackingProcess from '../SellerTrackingProcess/SellerTrackingProcess'

function SellerTrackingPage() {
    return (
        <>
            <HeaderContent />
            <div className="sellerTrackingPageContainer">
                <div className="sellerTrackingPageContainerLeft">
                    <SellerTrackingProcess completedStep={6} />
                </div>
                <div className="sellerTrackingPageContainerRight">
                    <CountdownTimer
                        startTime={new Date().toISOString()} // Current time
                        endTime={new Date(new Date().getTime() + 1 * 60 * 1000).toISOString()}
                        buttonText="Book for your Next Day"
                        buttonLink="/bookingPage"
                        expiredMessage="Inform to buyer return your Item in 24 hours."  // Custom expiration message
                    />

                    <FeedbackSection
                        title="Rate Buyer"
                        action="/submitBuyerFeedback.php"  // Pass the dynamic URL here
                    />
                </div>
            </div>
        </>
    )
}

export default SellerTrackingPage;
