import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
export default function Register() {
  let navgite=useNavigate()
  let [isloading,setloading]=useState(false)
  let [errmess,seterrmess]=useState('')
  async function postregist(reqbody) {
    setloading(true)
    let {repass,... datatosend}=reqbody
    try {
      let res = await axios.post("http://localhost:3000/register" ,datatosend)
      if (res.status==201) {
        navgite('/Login')
      }
      setloading(false)
    } catch (error) {
      seterrmess(error.response.data)
      setloading(false)
    }
  }
  const validationSchema = yup.object({
    name:yup.string().min(3,"name is too short").max(10,"name is too long").required("name is requrired"),
    email:yup.string().email("email is not valid").required("email is requrired"),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,"phone is not valid").required("phone is requrired"),
    password:yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{8,}$/,"password is not valid").required("password is requrired"),
    repass:yup.string().oneOf([yup.ref('password')],"password does not match").required("Re-password is requrired")
  })
  const formik=useFormik({
    initialValues:{
      email:'',
      name:'',
      phone:'',
      password:'',
      repass:''
    },
    validationSchema,
    onSubmit:postregist
  })
  return <>
  <div className="vh-100 d-flex align-items-center">
  <form onSubmit={formik.handleSubmit} className='w-50 mx-auto bg-light p-4'>
    {errmess ? <div className='alert alert-danger m-3'>{errmess}</div>:null}
    <div className="mb-4">
      <label htmlFor="name" className='form-label'>Full Name</label>
      <input type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.name && formik.touched.name ? (<div className='alert alert-danger m-3'>{formik.errors.name}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="email" className='form-label'>Email</label>
      <input type="text" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.email && formik.touched.email ? (<div className='alert alert-danger m-3'>{formik.errors.email}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="password" className='form-label'>Password</label>
      <input type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger m-3'>{formik.errors.password}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="repass" className='form-label'>Re-password</label>
      <input type="password" name='repass' id='repass' value={formik.values.repass} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.repass && formik.touched.repass ? (<div className='alert alert-danger m-3'>{formik.errors.repass}</div>):null}
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className='form-label'>Phone Number</label>
      <input type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
      {formik.errors.phone && formik.touched.phone ? (<div className='alert alert-danger m-3'>{formik.errors.phone}</div>):null}
    </div>
    <button type='submit' className='btn btn-outline-success d-block m-auto'>
      {isloading? <i className="fa-solid fa-spinner fa-spin" ></i>:"submit"}
    </button>
  </form>
  </div>
  </>
}
