import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';
import UserCaseTableComponent from '../UserCaseTableComponent/UserCaseTableComponent';

function AdminPanelUserCasePage() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/RentIT/Controllers/caseController.php', {
            params: { status: "1" }
        })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columnHeaders = {
        caseaffecter: 'Case affecter',
        caseCategory: 'Category',
        caseOpener: 'Case Opener',
        column4: 'Action'
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
                        <div>
                            <h1>Admin Panel - User Case</h1>
                            <UserCaseTableComponent data={data} columnHeaders={columnHeaders} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanelUserCasePage
