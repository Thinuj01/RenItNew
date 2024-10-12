import React, { useEffect, useState } from 'react'
import './BuyerTrackingPage.css'
import HeaderContent from '../../HeaderContent/HeaderContent'
import BuyerTrackingProcess from './../BuyerTrackingProcess/BuyerTrackingProcess'
import FeedbackSection from '../FeedbackSection/FeedbackSection'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

function BuyerTrackingPage() {
    const [trackingStep,setTrackingStep] = useState(0);
    const [onGoing,setOnGoing] = useState(0);
    const [endDate,setEndDate] = useState();
    const [startDate,setStartDate] = useState();
    const [caseData,setCaseData] = useState([]);
    const location = useLocation();
    const { reserve_id } = location.state || {};


    const sellertitleCase = 'Case open to Seller'
    const sellercategoryOptions = ['Non-Delivery of Goods',
                                'Shipping Issues', 
                                'Breach of Platform Policies', 
                                'Unjustified Price Changes', 
                                'Other'];
                                
    const sellerlabel1 = 'Case Description';
    const sellerlabel2 = 'User Request';

    const itemtitleCase = 'Case open to Item'
    const itemcategoryOptions = ['Item Not as Described', 
                                'Counterfeit or Fake Products', 
                                'Damaged or Defective Goods', 
                                'Other'];
                                
    const itemlabel1 = 'Case Description';
    const itemlabel2 = 'User Request';

    useEffect(()=>{
        const intervalId = setInterval(() =>{axios.get('http://localhost:80/RentIT/Controllers/trackingController.php',{   
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
                        titleCase={itemtitleCase}
                        categoryOptions={itemcategoryOptions}
                        label1={itemlabel1}
                        label2={itemlabel2}
                        data={caseData}
                    />

                    <FeedbackSection
                        title="Rate Seller"
                        action="/submitSellerFeedback.php"
                        completedStep={trackingStep}
                        reserve_id={reserve_id}
                        titleCase={sellertitleCase}
                        categoryOptions={sellercategoryOptions}
                        label1={sellerlabel1}
                        label2={sellerlabel2}
                        data={caseData}
                    />
                </div>
            </div>
        </>
    )
}

export default BuyerTrackingPage
