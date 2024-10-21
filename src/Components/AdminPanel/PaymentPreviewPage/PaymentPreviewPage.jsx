import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentPreviewPage.css'
import UserApprovalTableComponent from '../UserApprovalTableComponent/UserApprovalTableComponent';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';
import { useNavigate} from 'react-router-dom'

function PaymentPreviewPage() {

    const columnHeaders = {
        NIC: 'ID',
        firstname: 'First Name',
        district: 'District',
        column4: 'Action'
    };

    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    const isAdmin = details && details['is_Admin'];

    useEffect(() => {
        axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, {
          withCredentials: true
        })
          .then(response => {
            const data = response.data;
            console.log(response.data);
            setDetails(data);
          });
      }, []);

    isAdmin ? null : navigate('/');

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php', {
            params: { status: "2" }
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
                            <h1>Admin Panel - User Approval</h1>
                            <UserApprovalTableComponent data={data} columnHeaders={columnHeaders} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPreviewPage
