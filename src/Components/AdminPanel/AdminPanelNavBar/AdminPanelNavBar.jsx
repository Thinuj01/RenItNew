import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './AdminPanelNavBar.css'
import Logo from '../../../assets/logo.png'
import AdminPanelMenuLinks from '../AdminPanelMenuLinks/AdminPanelMenuLinks'

function AdminPanelNavBar() {
  const navigate = useNavigate();

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  function logout() {
    setCookie("PHPSESSID", 0, -1);
    navigate("/");
    location.reload();
  }

  return (
    <>
        <div id="adminPanelNavContent">
            <div className="logo">
            <Link to='/'><img src={Logo} alt="Rentit Home" /></Link>
            </div>

            <div id="adminPanelMenuLinks">
                <AdminPanelMenuLinks adminPanelLinkName="Home" adminPanelURL="/AdminPanelHomePage"/>
                <AdminPanelMenuLinks adminPanelLinkName="User Approval Request" adminPanelURL="/AdminPanelUserApprovalPage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Item Approval Request" adminPanelURL="/AdminPanelItemApprovalPage"/>
                <AdminPanelMenuLinks adminPanelLinkName="User Case Management" adminPanelURL="/AdminPanelUserCasePage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Item Case Management" adminPanelURL="/AdminPanelItemCasePage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Admin Management" adminPanelURL="/AdminManagementPage"/>
                <AdminPanelMenuLinks adminPanelLinkName="Payment Preview" adminPanelURL="/PaymentPreviewPage"/>
                <button onClick={() => {logout()}} className="nav-logout-button">Logout</button>
            </div>
        </div>
    </>
  )
}

export default AdminPanelNavBar
