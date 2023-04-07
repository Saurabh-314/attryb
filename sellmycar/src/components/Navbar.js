import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from '../context/ProductContext';

const Navbar = () => {
  const { roll, isloggedIn, LogoutFun } = useProductContext();

  const navigate = useNavigate();

  const logout = () => {
    LogoutFun();
    navigate("/login");
  }

  return (
    <div className="navbarClass">
      <ul>
        <li>
          <Link to="/" className='link'>Home</Link>
        </li>
        {
          roll != 'buyer' ?
            (
              <li>
                <Link to="/additem" className='link'>Add New Car</Link>
              </li>
            ) : ""
        }
        {
          !isloggedIn ?
            (
              <>
                <li>
                  <Link to="/login" className='link'>Login</Link>
                </li>
                <li>
                  <Link to="/register" className='link'>Register</Link>
                </li>
              </>

            )
            :
            (
              <li>
                <Link onClick={logout} className='link'>Logout</Link>
              </li>

            )
        }
      </ul>
    </div>
  )
}

export default Navbar