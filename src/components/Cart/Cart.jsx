import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let [details,setdetils]=useState([])
  let {getcart,deletecart,updatecart} = useContext(Cartcontext)
  async function show() {
    let res = await getcart()
    setdetils(res.data)
  }
  async function deletefromcart(id) {
    let res = await deletecart(id)
    show()
  }
  async function updatefromcart(id,count) {
    let res = await updatecart(id,count)
    if (res.data.count==0) {
      deletefromcart(id)
    }
    show()
  }
  

  useEffect(()=>{show()},[])
  return <>
  <div className="container min-vh-100">
    <h1 className=' py-3 text-center'>Shopping Cart</h1>
      <h3 className='h4 p-4'>Total Items Cart: <span className=' fw-bolder'>{details.length}</span></h3>
      {details.map((ele)=><div key={ele.id} className="rounded-4 bg-light row mb-5 p-4">
        <div className="col-md-1">
          <img src={ele.image} className='w-100' alt={ele.title} />
        </div>
        <div className="col-md-9">
          <h4>{ele.title}</h4>
          <h4>Price: {ele.price} $</h4>
          <button onClick={()=>deletefromcart(ele.id)} className='btn text-danger'>remove item</button>
        </div>  
        <div className="col-md-2 d-flex align-items-center">
          <button className='btn btn-danger' onClick={()=>updatefromcart(ele.id,ele.count-1)}>-</button>
          <span className='mx-2'>{ele.count}</span>
          <button className='btn btn-success' onClick={()=>updatefromcart(ele.id,ele.count+1)}>+</button>
        </div>
      </div>)}
      {details.length==0 ? <div className='fw-lighter text-center'>there is nothing here</div> : <Link to={'/CheckOut'}><button className='btn w-100 btn-success'>Check Out</button></Link>}
    </div>
  </>
}
