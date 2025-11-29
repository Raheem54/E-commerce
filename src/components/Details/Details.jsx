import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { Cartcontext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function Details() {
  let {category} = useParams()
  function getcatdata(cat) {
    return axios.get(`http://localhost:3000/products?category=${cat}`)
  }
  
  const {error,isLoading,isError,data} = useQuery({queryKey:['category',category],queryFn:()=>getcatdata(category)})
  let {addtocart} = useContext(Cartcontext)
  async function addcart(ele) {
    let res =await addtocart(ele)
    if (res.status==201) {
      toast.success("product add to cart successfuly")
    }else{
      toast.error("product is not add")
    }
    console.log(res);
    
  }
  
  return <>
  {isError ? <div className=' alert alert-danger text-center mt-5 container'>{error.message}</div>:null}
  {isLoading? <div className='vh-100 d-flex justify-content-center align-items-center'><PulseLoader /></div>:null}
  <div className="row py-4 container m-auto min-vh-100">
    {data?.data.map((ele)=>
    <div className=" col-md-3 g-5" key={ele.id}>
      <div className=" product bg-light rounded-5 p-4 d-flex flex-column align-items-center">
        <img src={ele.image} className='w-100' style={{objectFit:"contain",height:'200px'}} alt={ele.title} />
        <p>{ele.title.split(" ").slice(0,5).join(" ")}...</p>
        <h3>{ele.price} $</h3>
        <button onClick={()=>addcart(ele)} className='btn btn-success'>Add to Cart</button>
      </div>
      
    </div>)}
    
  </div>
  </>
}
