import React from 'react';
import './MenuLinks.css';
import { Link } from 'react-router-dom';

function MenuLinks({ url, linkName, onClick }) { // Destructure props to access url, linkName, and onClick
  return (
    <div>
      <Link id='menuLink' to={url} onClick={onClick}>{linkName}</Link> {/* Pass the onClick function to the Link */}
    </div>
  );
}

export default MenuLinks;
