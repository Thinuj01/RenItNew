import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';
import ItemCaseTableComponent from '../ItemCaseTableComponent/ItemCaseTableComponent';
import { useNavigate} from 'react-router-dom'

function AdminPanelItemCasePage() {

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
        axios.get('http://localhost:4433/RentIT/Controllers/caseController.php', {
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

    const columnHeaders = {
        column1: 'Item ID',
        caseCategory: 'Category',
        column3: 'Case Opener',
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
                            <h1>Admin Panel - Item case</h1>
                            <ItemCaseTableComponent data={data} columnHeaders={columnHeaders} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanelItemCasePage
