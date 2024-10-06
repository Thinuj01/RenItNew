import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemApprovalTableComponent from '../ItemApprovalTableComponent/ItemApprovalTableComponent';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';

function AdminPanelItemApprovalPage() {

    const columnHeaders = {
        item_id: 'ID',
        title: 'Title',
        name: 'Category',
        district: 'District',
        column4: 'Action'
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/showItemsController.php', {
            params: { status: "4" }
        })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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
                        <div>
                            <h1>Admin Panel - Item Approval</h1>
                            <ItemApprovalTableComponent data={data} columnHeaders={columnHeaders} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanelItemApprovalPage
