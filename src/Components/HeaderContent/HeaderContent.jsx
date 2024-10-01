import React, { useState, useEffect } from 'react'
import './HeaderContent.css'
import MenuLinks from '../MenuLinks/MenuLinks'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

function HeaderContent() {
  const [details, setDetails] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, {
      withCredentials: true
    })
      .then(response => {
        const data = response.data;
        console.log(response.data);
        setDetails(data);
      });
  }, []);

  return (
    <div id="navContent">
      <Link to='/'><img src={Logo} alt="Rentit Home" /></Link>

      <div id='menuLinks'>
        <MenuLinks linkName="Home" url="/" />
        <MenuLinks linkName="Category" url="/category" />
        <MenuLinks linkName="Package" url="/package" />
        <MenuLinks linkName="About" url="/about" />

        {details && details['fname'] ? (
          <>
            Hi, <MenuLinks linkName={details['fname']} url="/BuyerPage" />
          </>
        ) : (
          <>
            <Link to='/signin' id='signInButton'>Sign in</Link>
          </>
        )}

      </div>
    </div>
  )
}

export default HeaderContent
