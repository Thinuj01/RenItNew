import React, { useEffect, useState } from 'react'
import './BuyerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import BuyerTrackingProcess from './../BuyerTrackingProcess/BuyerTrackingProcess'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import axios from 'axios'

function BuyerTrackingPage() {
    const reserve_id = 'R66faebc12e4';
    const [trackingStep,setTrackingStep] = useState(0);
    const [onGoing,setOnGoing] = useState(0);
    const [endDate,setEndDate] = useState();
    const [startDate,setStartDate] = useState();

    useEffect(()=>{
        const intervalId = setInterval(() =>{axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
                params:{
                    status:"1",
                    reserve_id:reserve_id
                }
        })
        .then(response=>{
            console.log("track",response.data);
            setTrackingStep(response.data.buyer_tracking_step);
            setOnGoing(response.data.onGoing);
            setEndDate(new Date(response.data.return_date).toISOString());
        })
        .catch(err=>{
            console.error(err);
        })}
        ,500);
        return () => clearInterval(intervalId);
    })
    return (
        <>
            <HeaderContent />
            <div className="buyerTrackingPageContainer">
                <div className="buyerTrackingPageContainerLeft">
                    <BuyerTrackingProcess completedStep={trackingStep} reserve_id={reserve_id}/>
                </div>
                <div className="buyerTrackingPageContainerRight">
                    <CountdownTimer
                        startTime={startDate} // Current time
                        endTime={onGoing==1?endDate:new Date().getTime()}
                        buttonText="Book for your Next Day"
                        buttonLink="/bookingPage"
                        expiredMessage="You must returned your Item in 24 hours."  // Custom expiration message
                    />



                    <FeedbackSection
                        title="Rate Item"
                        action="/submitItemFeedback.php"
                        completedStep={trackingStep}  // Pass the dynamic URL here
                    />

                    <FeedbackSection
                        title="Rate Seller"
                        action="/submitSellerFeedback.php"
                        completedStep={trackingStep}  // Pass the dynamic URL here
                    />
                </div>
            </div>
        </>
    )
}

export default BuyerTrackingPage
