import React from 'react'
import './BuyerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import BuyerTrackingProcess from './../BuyerTrackingProcess/BuyerTrackingProcess'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'

function BuyerTrackingPage() {
    return (
        <>
            <HeaderContent />
            <div className="buyerTrackingPageContainer">
                <div className="buyerTrackingPageContainerLeft">
                    <BuyerTrackingProcess completedStep={3} />
                </div>
                <div className="buyerTrackingPageContainerRight">
                    <CountdownTimer
                        startTime={new Date().toISOString()} // Current time
                        endTime={new Date(new Date().getTime() + 1 * 60 * 1000).toISOString()}
                        buttonText="Book for your Next Day"
                        buttonLink="/bookingPage"
                        expiredMessage="You must returned your Item in 24 hours."  // Custom expiration message
                    />



                    <FeedbackSection
                        title="Rate Item"
                        action="/submitItemFeedback.php"  // Pass the dynamic URL here
                    />

                    <FeedbackSection
                        title="Rate Seller"
                        action="/submitSellerFeedback.php"  // Pass the dynamic URL here
                    />
                </div>
            </div>
        </>
    )
}

export default BuyerTrackingPage
