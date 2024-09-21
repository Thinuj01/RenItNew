import React, { useState } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './BuyerPage.css';
import BuyerRate from '../BuyerRate/BuyerRate';
import SellerPage from '../SellerPage/SellerPage'; // Import SellerPage
import GroupedItems from '../../GroupedItems/GroupedItems';

function BuyerPage() {

    // Sample Items
    const items = [
        { id: 1, date: '2023-09-12', category: 'Food', name: 'Pizza' },
        { id: 2, date: '2023-09-10', category: 'Food', name: 'Burger' },
        { id: 3, date: '2023-08-15', category: 'Clothing', name: 'Shirt' },
        { id: 4, date: '2023-09-11', category: 'Clothing', name: 'Jeans' }
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(true); // Toggle state for Buyer/Seller

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleToggle = () => {
        setIsBuyer(!isBuyer); // Toggle between Buyer and Seller
    };

    if (!isBuyer) {
        return <SellerPage />; // Show SellerPage if not a buyer
    }

    return (
        <>
            <HeaderContent />
            <div className="buyerPageContainer">
                <div className="buyerPageContainerTop">
                    <div className="buyerPageContainerTopLeft">
                        {/* Pass handleToggle to UserForm */}
                        <UserForm isBuyer={isBuyer} handleToggle={handleToggle} />
                    </div>
                    <div className="buyerPageContainerTopRight">
                        <BuyerRate />
                    </div>
                </div>

                <div className="buyerPageContainerBottom">
                    <div className="tabsContainer">
                        <div className="tabs">
                            <button
                                className={`tabButton ${activeTab === 0 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                Wishlist
                            </button>
                            <button
                                className={`tabButton ${activeTab === 1 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(1)}
                            >
                                Rented items
                            </button>
                        </div>
                        <div className="verticalDivider"></div> {/* Vertical line */}
                        <div className="tabContent">
                            {activeTab === 0 &&
                                <div>
                                    <GroupedItems items={items} />
                                </div>
                            }

                            {activeTab === 1 &&
                                <div>
                                    <GroupedItems items={items} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyerPage;
