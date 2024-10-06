import React, { useState } from 'react';
import './BuyerTrackingProcess.css';
import axios from 'axios'

const BuyerTrackingProcess = ({ completedStep,reserve_id }) => {
    
    const [otp, setOtp] = useState(""); // State for OTP input

    const steps = [
        { label: "Payment Successful", description: "Your payment has been successfully processed." },
        { label: "Receive OTP Code", description: "You will receive an OTP code now. Please keep it safe for further progress." },
        { label: "Seller Handover", description: "The seller will hand over the item to the courier service." },
        { label: "Receive Item", description: "You receive the item. (In here, seller will ask you the OTP that received in * marked step. Please provide it to the seller for verification.)" },
        { label: "OTP Verification", description: "The seller will verify the OTP for confirming the transaction." },
        { label: "Start the Rental Period", description: "Your rental period will begin after OTP verification." },
        { label: "End the Rental Period", description: "Your rental period is now over. Please return the items to seller." },
        { label: "Items Received to the Seller.", description: "Items successfully returned to the Seller." },
        { label: "Seller OTP Verification", description: "The seller will give you an OTP code after they received the items & you can verify it by below box. (By doing so, you’ll maintain your account quality, stay in good interactions with sellers  and continue enjoying the benefits of renting items.)" },
        { label: "Rate the items", description: "You can rate the items now." }
    ];

    const BuyerHandOver=()=>{
        axios.get('http://localhost:80/RentIT/Controllers/trackingController.php',{   
            params:{
                status:"4",
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
        axios.get('http://localhost:80/RentIT/Controllers/trackingController.php',{   
            params:{
                status:"5",
                reserve_id:reserve_id,
                sellerOTP:otp
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

    const isOtpStep = steps.length - 2; // Target OTP input to appear for the 7th step (step index: steps.length - 3)
    const isHandOverStep =steps.length - 4;

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
                                        disabled={8> completedStep||8<completedStep} // Disable if this step is not yet completed
                                    />
                                    <button 
                                        type="submit" 
                                        className="otp-submit-button" 
                                        disabled={8> completedStep||8<completedStep} // Disable submit button too
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
                                        disabled={completedStep < 5 || completedStep > 5}
                                        onChange={()=>{
                                            BuyerHandOver();
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

export default BuyerTrackingProcess;
