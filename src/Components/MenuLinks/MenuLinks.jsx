import React from 'react';
import './MenuLinks.css';
import { Link } from 'react-router-dom';

function MenuLinks({ url, linkName, onClick }) { 
  return (
    <div>
      <Link
        className={({ isActive }) => 
          isActive ? 'menuLink active' : 'menuLink'
        }
        id='menuLink' to={url} onClick={onClick}
      >
        {linkName}
      </Link>
    </div>
  );
}

export default MenuLinks;
