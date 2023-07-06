import React from 'react'
import './navbar.css'
import Icons from 'react-icons'
import logo from '../../assets/Logo.png'

const Navbar = () => {
  return (
    <div className="wd--navbar">
      <div className="wd--navbar-links">
        <div className='wd--navbar-links-logo'>
          <img src={logo} alt="Logo" />
        </div>
      </div>
      </div>
  )
}

export default Navbar