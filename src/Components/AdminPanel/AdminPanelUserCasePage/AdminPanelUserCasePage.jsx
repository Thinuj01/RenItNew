import React from 'react'
import AdminPanelNavBar from '../AdminPanelNavBar/AdminPanelNavBar';

function AdminPanelUserCasePage() {

    const tableData = [
        { column1: 'Unique 1', column2: 'Category A', column3: 'Status 1' },
        { column1: 'Unique 2', column2: 'Category B', column3: 'Status 2' },
        { column1: 'Unique 3', column2: 'Category A', column3: 'Status 2' },
        { column1: 'Unique 4', column2: 'Category C', column3: 'Status 3' },
        { column1: 'Unique 5', column2: 'Category B', column3: 'Status 2' },
    ];

    const columnHeaders = {
        column1: 'ID',
        column2: 'Category',
        column3: 'Status',
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
                            <h1>Admin Panel</h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanelUserCasePage
