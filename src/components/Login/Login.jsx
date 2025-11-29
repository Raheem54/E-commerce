import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { tokencontext } from '../../context/Tocken';

export default function Login() {
  let [errmess,seterrmess]=useState('')
  let [loading,setloading]=useState(false)
  let {tocken,settocken}=useContext(tokencontext)
  let navigate=useNavigate()
  async function postlog(req) {
    setloading(true)
    try{
      let res=await axios.post("http://localhost:3000/login",req)
      if(res.status==200)
      {
        localStorage.setItem("userTocken",res.data.accessToken)
        settocken(res.data.accessToken)
        navigate("/Home")
      }
      setloading(false)
    }catch(error){
      seterrmess(error.response.data)
      setloading(false)
    }
  }
  let validationSchema=yup.object({
    email:yup.string().email("email is not valid").required("email is requrired"),
    password:yup.string().required("password is requried")
  })
  const formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema,
    onSubmit:postlog
  })
  return <>
    <div className="vh-100 d-flex align-items-center">
      <form onSubmit={formik.handleSubmit} className='w-50 mx-auto bg-light p-4'>
        {errmess ? <div className='alert alert-danger m-3'>{errmess}</div>:null}
        <div className="mb-4">
          <label htmlFor="email" className='form-label'>Email</label>
          <input type="email" className='form-control' name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.email&&formik.touched.email ? <div className='alert alert-danger m-3'>{formik.errors.email}</div>:null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className='form-label'>password</label>
          <input type="password" className='form-control' name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.password&&formik.touched.password ? <div className='alert alert-danger m-3'>{formik.errors.password}</div>:null}
        </div>
        <button type='submit' className='btn btn-outline-success d-block m-auto'>
          {loading? <i className="fa-solid fa-spinner fa-spin" ></i>:"log in"}
        </button>
      </form>
    </div>
  </>
}
