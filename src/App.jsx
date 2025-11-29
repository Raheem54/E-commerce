import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Category from './components/Category/Category'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Product from './components/Product/Product'
import { useContext, useEffect } from 'react'
import { tokencontext } from './context/Tocken'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Details from './components/Details/Details'
import CheckOut from './components/CheckOut/CheckOut'
function App() {
  let router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {path:'Home',element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'',element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'Category',element:<ProtectedRoutes><Category/></ProtectedRoutes>},
      {path:'Login',element:<Login/>},
      {path:'*',element:<Notfound/>},
      {path:'Register',element:<Register/>},
      {path:'Cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'Details/:category',element:<ProtectedRoutes><Details/></ProtectedRoutes>},
      {path:'CheckOut',element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>},
      {path:'Product',element:<ProtectedRoutes><Product/></ProtectedRoutes>}
    ]}
  ])
  let {tocken,settocken}=useContext(tokencontext)
  useEffect(()=>{
    if (localStorage.getItem('userTocken')!=null)
    {
      settocken(localStorage.getItem('userTocken'))
    }
  },[])
  return <RouterProvider router={router}></RouterProvider>

}

export default App
