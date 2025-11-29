import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { tokencontext } from '../../context/Tocken'
export default function Navbar() {
  let {tocken,settocken}=useContext(tokencontext)
  let navigate=useNavigate()
  function Logout() {
    navigate("/Login")
    localStorage.removeItem('userTocken')
    settocken(null)
  }
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand" to={'Home'}><i className="fa fa-shopping-cart" aria-hidden="true"></i> business</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
        {tocken ?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className='nav-link' to={'Home'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to={'Category'}>Category</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to={'Product'}>Product</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to={'Cart'}>Cart</Link>
        </li>
        </ul>:null}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {tocken ?
        <li className="nav-item">
          <button className='nav-link' onClick={Logout}>log out</button>
        </li>: 
        <>
        <li className="nav-item">
          <Link className='nav-link' to={'Login'}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to={'Register'}>Register</Link>
        </li>
        </>}
        
      </ul>
    </div>
  </div>
</nav>


  </>
}
