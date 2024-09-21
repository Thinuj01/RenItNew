import React from 'react'
import './SideMenu.css'

function SideMenu() {
  return (
    <div>
        <div className="SideContent">
            <a href='#'>Listed Items</a>
        </div>
        <div className="SideContent">
            <a href='#'>Sales History</a>
        </div>
        <div className="SideContent">
            <a href='#'>Pending Orders</a>
        </div>
        <div className="ButtonFeild">
            <button>Add Item</button>
        </div>
    </div>
  )
}

export default SideMenu