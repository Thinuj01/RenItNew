import React from 'react'
import './AdminPanelNavBar.css'
import Logo from '../../../assets/logo.png'
import AdminPanelMenuLinks from '../AdminPanelMenuLinks/AdminPanelMenuLinks'

function AdminPanelNavBar() {
  return (
    <>
        <div id="adminPanelNavContent">
            <div className="logo">
                <img src={Logo} alt="Rentit Home" />
            </div>

            <div id="adminPanelMenuLinks">
                <AdminPanelMenuLinks adminPanelLinkName="Home" adminPanelURL="/AdminPanelHomePage"/>
                <AdminPanelMenuLinks adminPanelLinkName="User Approval Request" adminPanelURL="/AdminPanelUserApprovalPage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Item Approval Request" adminPanelURL="/AdminPanelItemApprovalPage"/>
                <AdminPanelMenuLinks adminPanelLinkName="User Case Management" adminPanelURL="/AdminPanelUserCasePage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Item Case Management" adminPanelURL="/AdminPanelItemCasePage"/>
                {/* <AdminPanelMenuLinks adminPanelLinkName="Admin Management" adminPanelURL=""/>
                <AdminPanelMenuLinks adminPanelLinkName="Payment Management" adminPanelURL=""/>
                <AdminPanelMenuLinks adminPanelLinkName="User Request" adminPanelURL=""/>
                <AdminPanelMenuLinks adminPanelLinkName="Logout" adminPanelURL=""/> */}
            </div>
        </div>
    </>
  )
}

export default AdminPanelNavBar
