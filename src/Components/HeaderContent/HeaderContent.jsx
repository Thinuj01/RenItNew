import React from 'react'
import './HeaderContent.css'
import MenuLinks from '../MenuLinks/MenuLinks'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

function HeaderContent() {
  return (
      <div id="navContent">
        <Link to='/'><img src={Logo} alt="Rentit Home" /></Link>

        <div id='menuLinks'>
            <MenuLinks linkName = "Home" url="/"/>
            <MenuLinks linkName = "Category" url="/category"/>
            <MenuLinks linkName = "Package" url="/package"/>
            <MenuLinks linkName = "About" url="/about"/>
            
            <Link to='/signin' id='signInButton'>Sign in</Link>
        </div>
      </div>
  )
}

export default HeaderContent
