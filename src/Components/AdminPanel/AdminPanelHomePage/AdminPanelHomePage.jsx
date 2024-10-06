import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanelHomePage.css';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';
import userSolidSVG from '/AdminPanelHomeImages/user-solid.svg';
import itemSolidSVG from '/AdminPanelHomeImages/item.svg';
import AdminHomePageCardContainer from '../AdminHomePageCardContainer/AdminHomePageCardContainer'; // Import the new component


function AdminPanelHomePage() {
    const [data, setData] = useState([]);
    const [itemApp, setItemApp] = useState([]);
    const [userApp, setUserApp] = useState([]);
    const [itemCase, setItemCase] = useState([]);
    const [userCase, setUserCase] = useState([]);

    const headers = ['District', 'Requests', 'View more'];

    useEffect(() => {
        // Simulating fetch data, replace with actual fetch call
        const fetchData = async () => {
            const result = [
                { district: 'Galle', requests: '09' },
                { district: 'Mathara', requests: '45' },
                { district: 'Hambanthota', requests: '25' },
                { district: 'Colombo', requests: '31' },
                // Add more rows here for testing scrolling
            ];
            setData(result);
        };

        fetchData();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php', {
            params: { status: "2" }
        })
            .then((response) => {
                const groupedData = Object.values(groupByDistrict(response.data));
                setUserApp(groupedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/showItemsController.php', {
            params: { status: "4" }
        })
            .then((response) => {
                const groupedData = Object.values(groupByDistrict(response.data));
                setItemApp(groupedData); // Set the grouped data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const groupByDistrict = (d) => {
        return d.reduce((acc, item) => {
            const district = item.district;
            if (!acc[district]) {
                acc[district] = { district, requests: 0 };
            }
            acc[district].requests += 1; // assuming each item is one request
            return acc;
        }, {});
    };

    

    return (
        <>
            <div className="adminPanelHomePageContainer">
                <div className="adminPanelHomePageNavContainer">
                    <AdminPanelNavBar />
                </div>

                <div className="adminPanelHomePageBodyContainer">
                    <div className="adminPanelHorizontalNavBar">
                        {/* Add horizontal navbar here */}
                    </div>

                    <div className="adminPanelBodyContainer">
                        <div className="adminPanelBodyContainerTop">
                            <div className="adminPanelBodyContainerTopLeft">
                                <AdminHomePageCardContainer
                                    title="User Approval Request"
                                    count={userApp.reduce((sum, user) => sum + user.requests, 0)}
                                    data={userApp}
                                    headers={headers}
                                    SvgIcon={userSolidSVG} // Pass the SVG as a prop
                                    cardMenuLink = "/AdminPanelUserApprovalPage"
                                />
                            </div>

                            <div className="adminPanelBodyContainerTopRight">
                                <AdminHomePageCardContainer
                                    title="Item Approval Request"
                                    count={itemApp.reduce((sum, item) => sum + item.requests, 0)}
                                    data={itemApp}
                                    headers={headers}
                                    SvgIcon={itemSolidSVG} // Pass the SVG as a prop
                                    cardMenuLink = "/AdminPanelItemApprovalPage"
                                />
                            </div>
                        </div>
                        <div className="adminPanelBodyContainerBottom">
                            <div className="adminPanelBodyContainerBottomLeft">
                                <AdminHomePageCardContainer
                                    title="User Case Management"
                                    count="1350"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={userSolidSVG} // Pass the SVG as a prop
                                    cardMenuLink = "/AdminPanelUserCasePage"
                                />
                            </div>
                            <div className="adminPanelBodyContainerBottomRight">
                                <AdminHomePageCardContainer
                                    title="Item Case Management"
                                    count="120"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={itemSolidSVG} // Pass the SVG as a prop
                                    cardMenuLink = "/AdminPanelItemCasePage"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPanelHomePage;
