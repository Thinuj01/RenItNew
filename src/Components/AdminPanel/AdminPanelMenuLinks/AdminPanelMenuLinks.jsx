import React from 'react';
import './AdminPanelMenuLinks.css';
import { NavLink } from 'react-router-dom';

function AdminPanelMenuLinks(props) {
  return (
    <>
        <NavLink 
          className={({ isActive }) => 
            isActive ? 'adminPanelMenuLink active' : 'adminPanelMenuLink'
          } 
          to={props.adminPanelURL}
        >
          {props.adminPanelLinkName}
        </NavLink>
    </>
  );
}

export default AdminPanelMenuLinks;
