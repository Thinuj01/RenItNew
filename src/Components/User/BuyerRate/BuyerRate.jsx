import React from 'react';
import './BuyerRate.css';

function BuyerRate() {
    return (
        <div className="buyerRateContainer">
            {/* Rating Section */}
            <div className="buyerRatingSection">
                <div className="leftSection">
                    <div className="buyerStars">
                        <span className="star green">&#9733;</span>
                        <span className="star green">&#9733;</span>
                        <span className="star green">&#9733;</span>
                        <span className="star green">&#9733;</span>
                        <span className="star">&#9733;</span>
                    </div>
                </div>

                <div className="ratingSection">
                    <span className="ratingScore">4.5</span><br />
                    <span className="ratingText">5 Users were rated</span><br />
                    <a href="#" className="feedbackLink">View more feedback &gt;</a>
                </div>
            </div>

            <div className="horizontalLine"></div>


            {/* Purchased and Upcoming Items Section */}
            <div className="itemsSection">
                <div className="totalItems">
                    <h3>Total purchased items</h3>
                    <div className="itemCount">25</div>
                </div>

                <div className="verticalLine"></div>

                <div className="upcomingItems">
                    <h3>Upcoming time period end items</h3>
                    <div className="subTopics">
                        <h4>Name</h4>
                        <h4>Remaining time</h4>
                        <h4>Get More time</h4>
                    </div>
                    <div className="itemRowScroller">
                        <div className="itemRow">
                            <span className="itemName">Item 01</span>
                            <span className="remainingTime">24 h : 25 m : 30 s</span>
                            <a href="#" className="exceedLink">Exceed period &gt;</a>
                        </div>
                        <div className="itemRow">
                            <span className="itemName">Item 02</span>
                            <span className="remainingTime">24 h : 25 m : 30 s</span>
                            <a href="#" className="exceedLink">Exceed period &gt;</a>
                        </div>
                        <div className="itemRow">
                            <span className="itemName">Item 03</span>
                            <span className="remainingTime">24 h : 25 m : 30 s</span>
                            <a href="#" className="exceedLink">Exceed period &gt;</a>
                        </div>
                        <div className="itemRow">
                            <span className="itemName">Item 03</span>
                            <span className="remainingTime">24 h : 25 m : 30 s</span>
                            <a href="#" className="exceedLink">Exceed period &gt;</a>
                        </div><div className="itemRow">
                            <span className="itemName">Item 03</span>
                            <span className="remainingTime">24 h : 25 m : 30 s</span>
                            <a href="#" className="exceedLink">Exceed period &gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerRate;
