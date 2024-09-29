import React from 'react'
import './AdminPanelMenuLinks.css'
import { Link } from 'react-router-dom'

function AdminPanelMenuLinks(props) {
  return (
    <>
        <Link className='adminPanelMenuLink' to={props.adminPanelURL}>{props.adminPanelLinkName}</Link>
    </>
  )
}

export default AdminPanelMenuLinks
