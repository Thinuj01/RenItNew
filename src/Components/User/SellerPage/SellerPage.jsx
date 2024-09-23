import React, { useState, useEffect } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './SellerPage.css';
import SellerRate from '../SellerRate/SellerRate';
import BuyerPage from '../BuyerPage/BuyerPage'; // Import BuyerPage
import axios from 'axios';

function SellerPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(false); // Toggle state for Buyer/Seller
    const [sessiondata, setSessionData] = useState({});
    const [data, setData] = useState([]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleToggle = () => {
        setIsBuyer(!isBuyer); // Toggle between Buyer and Seller
    };

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/getSessionValueController.php', {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                setSessionData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching session data:', error);
            });
    }, []);

    useEffect(() => {
        let isMounted = true;

        if (sessiondata.NIC) {
            axios.post('http://localhost:4433/RentIT/Controllers/getListedItemsController.php', { nic: sessiondata.NIC })
                .then((res) => {
                    if (isMounted) {
                        console.log('Listed Items:', res.data);
                        setData(res.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching listed items:', error);
                });
        }

        return () => {
            isMounted = false;
        };
    }, [sessiondata]);

    if (isBuyer) {
        return <BuyerPage />; // Show BuyerPage if toggled to Buyer
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
                        <SellerRate rating={4.3} totalUsers={5} itemCount={data[1]} />
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
                        <div className="verticalDivider"></div>
                        <div className="tabContent">
                            {activeTab === 0 && data.length > 0 ? (
                                data[0].map((item, index) => (
                                    <div className="itemRow" key={index}>
                                        <span className="itemName">{item.title}</span>
                                    </div>
                                ))
                            ) : activeTab === 1 ? (
                                <div>Sales History Content</div>
                            ) : activeTab === 2 ? (
                                <div>Pending Orders Content</div>
                            ) : (
                                <div>No items found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerPage;
