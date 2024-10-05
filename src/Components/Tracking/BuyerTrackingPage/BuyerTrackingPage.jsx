import React, { useEffect, useState } from 'react'
import './BuyerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import BuyerTrackingProcess from './../BuyerTrackingProcess/BuyerTrackingProcess'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import axios from 'axios'

function BuyerTrackingPage() {
    const reserve_id = 'R66f45b8e970';
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
                        expiredMessage={onGoing === 2 ? "Rental Process Ended" : onGoing === 0 ? "Order has not started yet":""}  // Custom expiration message
                        onGoing={onGoing}   // Custom expiration message
                    />



                    <FeedbackSection
                        title="Rate Item"
                        action="/submitItemFeedback.php"
                        completedStep={trackingStep}
                        reserve_id={reserve_id}
                    />

                    <FeedbackSection
                        title="Rate Seller"
                        action="/submitSellerFeedback.php"
                        completedStep={trackingStep}
                        reserve_id={reserve_id}
                    />
                </div>
            </div>
        </>
    )
}

export default BuyerTrackingPage
