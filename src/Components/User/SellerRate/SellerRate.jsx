import React from 'react';
import './SellerRate.css';

function SellerRate() {
    return (
        <div>
            <div className="sellerDashboardSummary">
                <div className="sellerRatingSection">
                    <div className="sellerStars">
                        <span className="sellerStar filled">&#9733;</span>
                        <span className="sellerStar filled">&#9733;</span>
                        <span className="sellerStar filled">&#9733;</span>
                        <span className="sellerStar filled">&#9733;</span>
                        <span className="sellerStar">&#9733;</span>
                    </div>
                    <div className="ratingSection">
                        <div className="ratingScore">4.0</div>
                        <div className="ratingText">5 Users were rated</div>
                        <a href="#" className="feedbackLink">View more feedback &gt;</a>
                    </div>
                </div>

                <div className="horizontalLine"></div>

                <div className="sellerSummarySection">
                    <div className="sellerSummaryItem">
                        <h3 className="summaryLabel">Total listed items</h3>
                        <div className="summaryValue">25</div>
                    </div>

                    <div className="verticalLine"></div>

                    <div className="sellerSummaryItem">
                        <h3 className="summaryLabel">Total Earnings</h3>
                        <div className="summaryValue">50$</div>
                    </div>

                    <div className="verticalLine"></div>

                    <div className="sellerSummaryItem">
                        <h3 className="summaryLabel">Pending Orders</h3>
                        <div className="summaryValue">45</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerRate;
