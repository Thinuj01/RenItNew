import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Create a CSS file for styling

const CountdownTimer = ({ startTime, endTime, buttonText, buttonLink, expiredMessage, onGoing }) => {
    const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [hasEnded, setHasEnded] = useState(false); // Track if countdown has ended
    const [rentalEnded, setRentalEnded] = useState(false); // Track if rental period has ended

    // Helper function to calculate the remaining time
    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const timeDifference = end - now;

        if (timeDifference <= 0) {
            setHasEnded(true); // Set flag to true when time is up
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    useEffect(() => {
        if (onGoing === 2) {
            setRentalEnded(true); // Set rentalEnded flag if onGoing is 2
            return;
        }

        // Update countdown every second if the rental hasn't ended
        const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        // Clear the timer when the component is unmounted
        return () => clearInterval(timer);
    }, [endTime, onGoing]);

    return (
        <div className="countdown-container">
            <div className="countdown-header">
                <h3>Item Countdown</h3>
                <p>Your item period has started, and you are remaining:</p>
            </div>

            {/* Countdown Timer or Expiration/Rental Ended Message */}
            <div className="countdownTimerDiv">
                {rentalEnded ? (
                    <div className="time-expired-message animate-alert">
                        <p>Rental period has ended.</p>
                    </div>
                ) : hasEnded ? (
                    <div className="time-expired-message animate-alert">
                        <p>Time has expired!</p>
                        <p>{expiredMessage}</p> {/* Configurable message passed as prop */}
                    </div>
                ) : (
                    <div className="countdown-timer">
                        <div className="time-section">
                            <span className="time-value">{remainingTime.days.toString().padStart(2, '0')}</span>
                            <span className="time-label">DD</span>
                        </div>
                        <span>:</span>
                        <div className="time-section">
                            <span className="time-value">{remainingTime.hours.toString().padStart(2, '0')}</span>
                            <span className="time-label">HH</span>
                        </div>
                        <span>:</span>
                        <div className="time-section">
                            <span className="time-value">{remainingTime.minutes.toString().padStart(2, '0')}</span>
                            <span className="time-label">MM</span>
                        </div>
                        <span>:</span>
                        <div className="time-section">
                            <span className="time-value">{remainingTime.seconds.toString().padStart(2, '0')}</span>
                            <span className="time-label">SS</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Show button or hide it based on whether countdown has ended */}
            <div className="button-container">
                {!hasEnded && !rentalEnded && (
                    <a href={buttonLink} className="navigate-button">{buttonText}</a>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;
