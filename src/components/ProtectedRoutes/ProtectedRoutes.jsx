import React, { useContext } from 'react'
import { tokencontext } from '../../context/Tocken'
import { Navigate } from 'react-router-dom'


function ProtectedRoutes(props) {
  if (localStorage.getItem('userTocken')!=null)
  {
    return props.children
  }else{
    return <Navigate to={"/Login"}/> // needs tag not event
  }
}

export default ProtectedRoutes