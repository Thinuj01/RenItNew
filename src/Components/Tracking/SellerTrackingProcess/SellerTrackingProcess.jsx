import React, { useState } from 'react';
import './SellerTrackingProcess.css';

const SellerTrackingProcess = ({ completedStep }) => {
    
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

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log("OTP Submitted:", otp);  // Handle OTP submission logic here
    };

    const isOtpStep = steps.length - 7; // Target OTP input to appear for the 7th step (step index: steps.length - 3)

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
                                        disabled={index > completedStep} // Disable if this step is not yet completed
                                    />
                                    <button 
                                        type="submit" 
                                        className="otp-submit-button" 
                                        disabled={index > completedStep} // Disable submit button too
                                    >
                                        Submit OTP
                                    </button>
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
