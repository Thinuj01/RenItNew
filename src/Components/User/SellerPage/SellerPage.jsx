import React, { useState } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './SellerPage.css';
import SellerRate from '../SellerRate/SellerRate';
import BuyerPage from '../BuyerPage/BuyerPage'; // Import BuyerPage

function SellerPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(false); // Toggle state for Buyer/Seller

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleToggle = () => {
        setIsBuyer(!isBuyer); // Toggle between Buyer and Seller
    };

    if (isBuyer) {
        return <BuyerPage />; // Show BuyerPage if it's a buyer
    }

    return (
        <>
            <HeaderContent />
            <div className="sellerPageContainer">
                <div className="sellerPageContainerTop">
                    <div className="sellerPageContainerTopLeft">
                        {/* Pass handleToggle to UserForm */}
                        <UserForm isBuyer={isBuyer} handleToggle={handleToggle} />
                    </div>
                    <div className="sellerPageContainerTopRight">
                        <SellerRate />
                    </div>
                </div>

                <div className="sellerPageContainerBottom">
                    <div className="tabsContainer">
                        <div className="tabs">
                            <button
                                className={`tabButton ${activeTab === 0 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                Listed Items
                            </button>
                            <button
                                className={`tabButton ${activeTab === 1 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(1)}
                            >
                                Sales History
                            </button>
                            <button
                                className={`tabButton ${activeTab === 2 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                Pending Orders
                            </button>
                        </div>
                        <div className="verticalDivider"></div> {/* Vertical line */}
                        <div className="tabContent">
                            {activeTab === 0 && <div>Content for Tab 1</div>}
                            {activeTab === 1 && <div>Content for Tab 2</div>}
                            {activeTab === 2 && <div>Content for Tab 3</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerPage;
