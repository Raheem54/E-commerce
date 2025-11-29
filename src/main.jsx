import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TokenContextProvider from '../src/context/Tocken.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './context/cartContext.jsx'
let qurey = new QueryClient()
createRoot(document.getElementById('root')).render(
    <CartContextProvider>
      <QueryClientProvider client={qurey}>
        <TokenContextProvider>
          <App /> 
        </TokenContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
)
