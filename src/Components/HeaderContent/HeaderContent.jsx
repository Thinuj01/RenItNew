import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderContent.css';
import MenuLinks from '../MenuLinks/MenuLinks';
import Logo from '../../assets/logo.png';
import axios from 'axios';

function HeaderContent({ categoryBarRef }) {
  const [details, setDetails] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    axios.get(`http://localhost:80/RentIT/Controllers/getSessionValueController.php`, {
      withCredentials: true
    })
      .then(response => {
        const data = response.data;
        setDetails(data);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleCategoryClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    if (categoryBarRef.current) {
      categoryBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smoothly scroll to CategoryBar
    }
  };

  return (
    <div id="navContent">
      <Link to='/'><img src={Logo} alt="Rentit Home" /></Link>

      <div id='menuLinks'>
        <MenuLinks linkName="Home" url="/" />
        <MenuLinks linkName="Category" url="#" onClick={handleCategoryClick} style={{ cursor: 'pointer' }} /> {/* Pass handleCategoryClick to onClick */}
        <MenuLinks linkName="About" url="/about" />

        {details && details['fname'] ? (
          <div className="nav-username-container" ref={dropdownRef} onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
            <span className="nav-username" onMouseEnter={() => setDropdownVisible(true)} >
              <MenuLinks linkName={details['fname']} url="/BuyerPage" />
            </span>

            {dropdownVisible && (
              <div className="nav-dropdown">
                {details['is_Admin'] === 1 && (
                  <Link to="/AdminPanelHomePage" className="nav-admin-link">Admin Panel</Link>
                )}
                <button onClick={() => {logout()}} className="nav-logout-button">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/signin' id='signInButton'>Sign in</Link>
        )}
      </div>
    </div>
  );
}

export default HeaderContent;
