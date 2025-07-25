import React, { useEffect, useState } from 'react'
import './SellerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import SellerTrackingProcess from '../SellerTrackingProcess/SellerTrackingProcess'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Footer from '../../Footer/Footer'

function SellerTrackingPage() {
    const [trackingStep,setTrackingStep] = useState(0);
    const [onGoing,setOGoing] = useState(0);
    const [endDate,setEndDate] = useState();
    const [startDate,setStartDate] = useState();
    const [caseData,setCaseData] = useState([]);
    const location = useLocation();
    const { reserve_id } = location.state || {};

    const titleCase = 'Case open to Buyer'
    const categoryOptions = ['Unauthorized Payments', 
                            'Payment Delay', 
                            'Fraudulent Returns', 
                            'Breach of Platform Policies', 
                            'Other'];
        
    const label1 = 'Case Description';
    const label2 = 'User Request';

    useEffect(()=>{
        console.log(reserve_id);    
        const intervalId = setInterval(() =>{axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
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
            setCaseData(response.data);
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
                        data={caseData}
                    />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SellerTrackingPage;
