import React, { useState } from 'react';
import './SellerTrackingProcess.css';
import axios from 'axios';

const SellerTrackingProcess = ({ completedStep ,reserve_id}) => {
    
    const [otp, setOtp] = useState(""); // State for OTP input

    const steps = [
        { label: "Payment Successful", description: "The customer’s payment has been successfully processed." },
        { label: "Handover the Item to Courier", description: "You have to hand over the item to the courier service." },
        { label: "Customer OTP Verification ", description: "You should verify the customer’s OTP to confirm the transaction & Start the Rental Period. (In here, you should ask customer to get their received OTP code. Then, enter it in below box to verify.)" },
        { label: "Start the Rental Period", description: "The rental period will begin after OTP verification." },
        { label: "End the Rental Period", description: "The rental period is now over. Customer will return the items to you." },
        { label: "Receive the OTP Code", description: "After ending the renter period, system will automatically send an OTP code to you. Please make sure to give this code to the customer after receiving the Items properly." },
        { label: "Items Received to you.", description: "Items successfully returned to the Seller." },
        { label: "OTP Verification", description: "Customer verified your OTP code successfully." },
        { label: "Rate the Customer", description: "You can rate the customer now." }
    ];

    const sellerHandOver =()=>{
        axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
            params:{
                status:"2",
                reserve_id:reserve_id
            }
        }).then(response=>{
            console.log(response.data);
        }).catch(err=>{
            console.error(err);
        })
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
            params:{
                status:"3",
                reserve_id:reserve_id,
                buyerOTP:otp
            }
        }).then(response=>{
            if(response.data == "unsuccess"){
                alert("OTP validation unsuccessful")
            }
            console.log(response.data);
        }).catch(err=>{
            console.error(err);
        })
        
    };

    const isOtpStep = steps.length - 7; // Target OTP input to appear for the 7th step (step index: steps.length - 3)
    const isHandOverStep =steps.length - 8;

    return (
        <div className="tracking-process">
            <div className="solid-line"></div> {/* The vertical line */}
            <div className="progress-line-container">
                {steps.map((step, index) => (
                    <div key={index} className={`step-container ${index <= completedStep ? 'completed' : ''}`}>
                        <div className={`circle ${index <= completedStep ? 'completed' : ''}`}></div>
                        <div className={`step-text ${index <= completedStep ? 'completed' : ''}`}>
                            <p className="step-title">{step.label}</p>
                            <p className="step-description">{step.description}</p>
                            
                            {/* Render OTP form at the appropriate step */}
                            {index === isOtpStep && (
                                <form onSubmit={handleOtpSubmit} className="otp-form">
                                    <input
                                        type="text"
                                        className="otp-input"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        disabled={2 > completedStep || 2<completedStep} // Disable if this step is not yet completed
                                    />
                                    <button 
                                        type="submit" 
                                        className="otp-submit-button" 
                                        disabled={2 > completedStep || 2<completedStep} // Disable submit button too
                                    >
                                        Submit OTP
                                    </button>
                                </form>
                            )}
                            {index === isHandOverStep &&(
                                <form>
                                    <input 
                                        type='checkbox'
                                        name='handedOver'
                                        disabled={completedStep > 0}
                                        onChange={()=>{
                                            sellerHandOver();
                                        }}
                                    />
                                </form>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerTrackingProcess;
