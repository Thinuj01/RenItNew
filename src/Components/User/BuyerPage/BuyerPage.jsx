import React, { useState, useEffect } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './BuyerPage.css';
import BuyerRate from '../BuyerRate/BuyerRate';
import SellerPage from '../SellerPage/SellerPage';
import GroupedItems from '../../GroupedItems/GroupedItems';
import axios from "axios";
import BuyerPendingOrders from '../BuyerPendingOrders/BuyerPendingOrders';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';

function BuyerPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(true);
    const [data, setData] = useState([]);
    const [rented, setRented] = useState([]);
    const [sessiondata, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTabClick = (index) => setActiveTab(index);

    const handleToggle = () => setIsBuyer(!isBuyer);


    useEffect(() => {
        axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, {
            withCredentials: true
        })
            .then(response => {
                setSessionData(response.data);
                console.log(response.data);
            })
            .catch(err => setError('Error fetching session data'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (sessiondata.NIC) {
            const fetchWishlist = axios.get('http://localhost:4433/RentIT/Controllers/wishlistDetailsController.php', { params:{nic: sessiondata.NIC,status:"1"} });
            const fetchRentedItems = axios.post('http://localhost:4433/RentIT/Controllers/rentedItemsController.php', { nic: sessiondata.NIC });

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

    const [rating, setRating] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
                    params: { buyerNIC: sessiondata.NIC, status: "5" },
                    withCredentials:true
                });
                setRating(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
    
        fetchData();
      }, [sessiondata]);

      useEffect(() => {
        const fetchRatings = async () => {
          const updatedPaths = await Promise.all(
            data.map(async (path) => {
              try {
                const response = await axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
                  params: { itemId: path.item_id, status: "3" },
                  withCredentials: true
                });
                return { ...path, rating: response.data };
              } catch (error) {
                console.error('There was an error fetching rating', error);
                return path;
              }
            })
          );
          setData(updatedPaths);
          console.log(updatedPaths);
        };
      
        if (data.length > 0) {
            console.log(2);
          fetchRatings();
        }
      }, [rating]);

      useEffect(() => {
        const fetchRatings = async () => {
          const updatedPaths = await Promise.all(
            rented.map(async (path) => {
              try {
                const response = await axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
                  params: { itemId: path.item_id, status: "3" },
                  withCredentials: true
                });
                return { ...path, rating: response.data };
              } catch (error) {
                console.error('There was an error fetching rating', error);
                return path;
              }
            })
          );
          setRented(updatedPaths);
        };
      
        if (rented.length > 0) {
            console.log(1);
          fetchRatings();
        }
      }, [rented]);

    if (!isBuyer)  {navigate("/SellerPage")};

    return (
        <>
            <HeaderContent />
            <div className="buyerPageContainer">
                <div className="buyerPageContainerTop">
                    <div className="buyerPageContainerTopLeft">
                        <UserForm isBuyer={isBuyer} handleToggle={handleToggle} />
                    </div>
                    <div className="buyerPageContainerTopRight">
                        {rating?<BuyerRate rating={rating[0]} totalUsers={rating[1]} />:null}
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
                            <button
                                className={`tabButton ${activeTab === 2 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                Pending Orders
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
                                    {activeTab === 2 && (
                                        <div>
                                            <BuyerPendingOrders buyer_nic={sessiondata.NIC}/>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default BuyerPage;
