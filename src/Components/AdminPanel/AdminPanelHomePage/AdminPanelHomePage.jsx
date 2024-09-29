import React, { useEffect, useState } from 'react';
import './AdminPanelHomePage.css';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';
import userSolidSVG from '/AdminPanelHomeImages/user-solid.svg';
import itemSolidSVG from '/AdminPanelHomeImages/item.svg';
import AdminHomePageCardContainer from '../AdminHomePageCardContainer/AdminHomePageCardContainer'; // Import the new component


function AdminPanelHomePage() {
    const [data, setData] = useState([]);

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
                                    count="110"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={userSolidSVG} // Pass the SVG as a prop
                                />
                            </div>

                            <div className="adminPanelBodyContainerTopRight">
                                <AdminHomePageCardContainer
                                    title="Item Approval Request"
                                    count="110"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={itemSolidSVG} // Pass the SVG as a prop
                                />
                            </div>
                        </div>
                        <div className="adminPanelBodyContainerBottom">
                            <div className="adminPanelBodyContainerBottomLeft">
                                <AdminHomePageCardContainer
                                    title="User Case Management"
                                    count="110"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={userSolidSVG} // Pass the SVG as a prop
                                />
                            </div>
                            <div className="adminPanelBodyContainerBottomRight">
                                <AdminHomePageCardContainer
                                    title="Item Case Management"
                                    count="110"
                                    data={data}
                                    headers={headers}
                                    SvgIcon={itemSolidSVG} // Pass the SVG as a prop
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
