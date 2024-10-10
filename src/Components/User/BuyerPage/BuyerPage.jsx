import React, { useState, useEffect } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './BuyerPage.css';
import BuyerRate from '../BuyerRate/BuyerRate';
import SellerPage from '../SellerPage/SellerPage';
import GroupedItems from '../../GroupedItems/GroupedItems';
import axios from "axios";

function BuyerPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(true);
    const [data, setData] = useState([]);
    const [rented, setRented] = useState([]);
    const [sessiondata, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleTabClick = (index) => setActiveTab(index);

    const handleToggle = () => setIsBuyer(!isBuyer);

    useEffect(() => {
        axios.get(`http://localhost:80/RentIT/Controllers/getSessionValueController.php`, {
            withCredentials: true
        })
            .then(response => setSessionData(response.data))
            .catch(err => setError('Error fetching session data'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (sessiondata.NIC) {
            const fetchWishlist = axios.get('http://localhost:80/RentIT/Controllers/wishlistDetailsController.php', { params:{nic: sessiondata.NIC,status:"1"} });
            const fetchRentedItems = axios.post('http://localhost:80/RentIT/Controllers/rentedItemsController.php', { nic: sessiondata.NIC });

            Promise.all([fetchWishlist, fetchRentedItems])
                .then(([wishlistResponse, rentedResponse]) => {
                    console.log(wishlistResponse.data);
                    console.log(rentedResponse.data);
                    setData(wishlistResponse.data);
                    setRented(rentedResponse.data);
                })
                .catch(err => setError('Error fetching data'))
                .finally(() => setLoading(false));
        }
    }, [sessiondata]);

    if (!isBuyer) return <SellerPage />;

    return (
        <>
            <HeaderContent />
            <div className="buyerPageContainer">
                <div className="buyerPageContainerTop">
                    <div className="buyerPageContainerTopLeft">
                        <UserForm isBuyer={isBuyer} handleToggle={handleToggle} />
                    </div>
                    <div className="buyerPageContainerTopRight">
                        <BuyerRate rating={4.5} totalUsers={10} />
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
                                Rented Items
                            </button>
                        </div>
                        <div className="verticalDivider"></div>
                        <div className="tabContent">
                            {/* Loading and Error States */}
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <>
                                    {activeTab === 0 && (
                                        <div>
                                            {data.length > 0 ? (
                                                <GroupedItems items={data} />
                                            ) : (
                                                <div>No Wishlist Items Found</div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 1 && (
                                        <div>
                                            {rented.length > 0 ? (
                                                <GroupedItems items={rented} />
                                            ) : (
                                                <div>No Rented Items Found</div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyerPage;
