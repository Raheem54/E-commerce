import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

export default function Category() {
  function getcat() {
    return axios.get("http://localhost:3000/category")
  }
  const {error,isLoading,isError,data} = useQuery({queryKey:['categories'],queryFn:getcat})
  
  return <>
  {isError ? <div className=' alert alert-danger text-center mt-5 container'>{error.message}</div>:null}
  {isLoading ? <div className=' vh-100 d-flex justify-content-center align-items-center'><PulseLoader/></div>:null}
  <div className="row justify-content-center align-items-center mx-5 min-vh-100">
    {data?.data.map((ele)=>
  <Link to={'/Details/'+ele.prefix} className='col-md-3 text-decoration-none text-black' key={ele.id}>
    <div className='product bg-light rounded-5 py-4 m-3 text-center shadow'>
      <img src={ele.image} alt={ele.title} className='mb-2' style={{objectFit:"cover",height:'400px',width:'400px'}}/>
      <h2 className=' fw-bolder'>{ele.title}</h2>
    </div>
    </Link>
    )}
  </div>    
    

  </>
}
