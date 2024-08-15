import React from 'react'
import './MenuLinks.css'
import { Link } from 'react-router-dom'

function MenuLinks(props) {
  return (
    <div>
      <Link id='menuLink' to={props.url}>{props.linkName}</Link>
    </div>
  )
}

export default MenuLinks
