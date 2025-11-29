import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios';
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Cartcontext } from '../../context/CartContext';
export default function CheckOut() {
  let navigate = useNavigate()
  let [isloading,setloading]=useState(false)
  let {clearcart}=useContext(Cartcontext)
  
  async function postregist(reqbody) {

    setloading(true)
    try {
      let res = await axios.post("http://localhost:3000/orders" ,reqbody)
      if (res.status==201) {
        toast.success("order was completed successfully")
        await clearcart()
        navigate('/Home')
      }
      setloading(false)
    } catch (error) {
      toast.error(error.message)
      setloading(false)
    }
  }
  const validationSchema = yup.object({
    name:yup.string().min(3,"name is too short").max(30,"name is too long").required("name is requrired"),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,"phone is not valid").required("phone is requrired"),
    address:yup.string().required("address is requrired"),
    details:yup.string()
  })
  const formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      address:'',
      details:''
    },
    validationSchema,
    onSubmit:postregist
  })
  return <>
  <div className="vh-100 d-flex align-items-center">
  <form onSubmit={formik.handleSubmit} className='w-50 mx-auto bg-light p-4'>
    <div className="mb-4">
      <label htmlFor="name" className='form-label'>Full Name</label>
      <input type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.name && formik.touched.name ? (<div className='alert alert-danger m-3'>{formik.errors.name}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="address" className='form-label'>address</label>
      <input type="text" name='address' id='address' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.address && formik.touched.address ? (<div className='alert alert-danger m-3'>{formik.errors.address}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className='form-label'>Phone Number</label>
      <input type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.phone && formik.touched.phone ? (<div className='alert alert-danger m-3'>{formik.errors.phone}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="details" className='form-label'>details</label>
      <input type="text" name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.details && formik.touched.details ? (<div className='alert alert-danger m-3'>{formik.errors.details}</div>):null}
    </div>
    <button type='submit' className='btn btn-outline-success d-block m-auto'>
      {isloading? <i className="fa-solid fa-spinner fa-spin" ></i>:"submit"}
    </button>
  </form>
  </div>
  </>
}
