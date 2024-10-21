import React, { useState, useEffect } from 'react';
import HeaderContent from './../../HeaderContent/HeaderContent';
import UserForm from '../UserForm/UserForm';
import './SellerPage.css';
import SellerRate from '../SellerRate/SellerRate';
import BuyerPage from '../BuyerPage/BuyerPage'; // Import BuyerPage
import axios from 'axios';
import GroupedItems from '../../GroupedItems/GroupedItems';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';


function SellerPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [isBuyer, setIsBuyer] = useState(false); // Toggle state for Buyer/Seller
    const [sessiondata, setSessionData] = useState({});
    const [data, setData] = useState([]);
    const [pendingItems, setPendingItemsData] = useState([]);
    const navigate = useNavigate();

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
            const fetchlistedItems = axios.post('http://localhost:4433/RentIT/Controllers/getListedItemsController.php', { nic: sessiondata.NIC });
            const fetchPendingOrders = axios.post('http://localhost:4433/RentIT/Controllers/getPendingOrdersController.php', { nic: sessiondata.NIC });
    
            Promise.all([fetchlistedItems, fetchPendingOrders])
                .then(([listedResponse, pendingResponse]) => {
                    if (isMounted) {
                        setData(listedResponse.data);
                        setPendingItemsData(pendingResponse.data);
                        console.log('Listed items: ', listedResponse.data);
                        console.log('Pending orders: ', pendingResponse.data);
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

    const [rating, setRating] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4433/RentIT/Controllers/feedbackController.php', {
                    params: { sellerNIC: sessiondata.NIC, status: "5" },
                    withCredentials:true
                });
                setRating(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
    
        fetchData();
      },[sessiondata]);

      useEffect(() => {
        const fetchRatings = async () => {
          const updatedPaths = await Promise.all(
            data.map(async (path) => {
              try {
                const response = await axios.get('http://localhost:4433/RentIT/Controllers/feedbackController.php', {
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
            console.log(1);
          fetchRatings();
        }
      }, [rating]);

      useEffect(() => {
        const fetchRatings = async () => {
          const updatedPaths = await Promise.all(
            pendingItems.map(async (path) => {
              try {
                const response = await axios.get('http://localhost:4433/RentIT/Controllers/feedbackController.php', {
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
          setPendingItemsData(updatedPaths);
        };
      
        if (pendingItems.length > 0) {
            console.log(2);
          fetchRatings();
        }
      }, [rating]);

      if (isBuyer)  {navigate("/BuyerPage")};

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
                      {rating?<SellerRate rating={rating[0]} totalUsers={5} itemCount={data.length} pendingCount={pendingItems.length} />:null}
                  </div>
                </div>

                <div className="sellerPageContainerBottom">
                    <div className="tabsContainer">
                        <div className="sellerTabs">
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
                            {/* <button
                                className={`tabButton ${activeTab === 2 ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                Pending Orders
                            </button> */}
                        </div>
                        <div className="verticalDivider"></div>
                        <div className="tabContent">
                            {activeTab === 0 && data.length > 0 ? (

                                <GroupedItems items={data} />

                            ) : activeTab === 1 ? (
                                <div>Sales History Content</div>
                            ) : activeTab === 2 && pendingItems.length > 0 ? (
                                
                                <GroupedItems items={pendingItems} />

                            ) : (
                                <div>No items found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SellerPage;
