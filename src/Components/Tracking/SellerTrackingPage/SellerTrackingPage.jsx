import React, { useEffect, useState } from 'react'
import './SellerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import SellerTrackingProcess from '../SellerTrackingProcess/SellerTrackingProcess'
import axios from 'axios'

function SellerTrackingPage() {
    const reserve_id = 'R66f45b8e970';
    const [trackingStep,setTrackingStep] = useState(0);
    const [onGoing,setOGoing] = useState(0);
    const [endDate,setEndDate] = useState();
    const [startDate,setStartDate] = useState();

    const titleCase = 'Case open to Buyer'
    const categoryOptions = ['Issue with Buyer', 'Payment Delay', 'Other'];
    const label1 = 'Case Description';
    const label2 = 'User Request';

    useEffect(()=>{
        const intervalId = setInterval(() =>{axios.get('http://localhost:80/RentIT/Controllers/trackingController.php',{   
                params:{
                    status:"1",
                    reserve_id:reserve_id
                }
        })
        .then(response=>{
            console.log("track",response.data);
            setTrackingStep(response.data.seller_tracking_step);
            setOGoing(response.data.onGoing);
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
            <div className="sellerTrackingPageContainer">
                <div className="sellerTrackingPageContainerLeft">
                    <SellerTrackingProcess completedStep={trackingStep} reserve_id={reserve_id}/>
                </div>
                <div className="sellerTrackingPageContainerRight">
                    <CountdownTimer
                        startTime={startDate} // Current time
                        endTime={onGoing==1?endDate:new Date().getTime()}
                        buttonText="Book for your Next Day"
                        expiredMessage={onGoing === 2 ? "Rental Process Ended" : onGoing === 0 ? "Order has not started yet":""}  // Custom expiration message
                        onGoing={onGoing}   // Custom expiration message
                    />

                    <FeedbackSection
                        title="Rate Buyer"
                        action="/submitBuyerFeedback.php"
                        completedStep={trackingStep}
                        reserve_id={reserve_id}
                        titleCase={titleCase}
                        categoryOptions={categoryOptions}
                        label1={label1}
                        label2={label2}
                    />
                </div>
            </div>
        </>
    )
}

export default SellerTrackingPage;
