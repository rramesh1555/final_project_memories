import React , { useEffect, useState }from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDataStore } from "../../store/storeContext";
import { notificationAction } from "../../store/reducers/notificationReducer";
import { messages, notificationType } from "../../constants/messages";

import { FaUser } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillLockFill } from "react-icons/bs";
import { ErrorMessage } from '@hookform/error-message';
import "./ui.css";



 const RegisterForm = () => { 

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [state, dispatch] = useDataStore();
      const {  notificationReducer } = state;

      const onSubmit = async (data) => {

        if (Object.entries(errors).length === 0) {
           
            if(data.password==data.passwordConfirmation){
                try {
                    console.log(data);
                       const formSubmit = await registerUser(data);
                      if (formSubmit) 
                      {
                        dispatch({
                            type : notificationAction.ADD_MSG,
                            payload : {
                                title: messages.REGISTER_SUCCESS,
                                type: notificationType.SUCCESS
                            }
                        });

                        setTimeout(() => {
                            window.location.reload();

                        }, 2000);
                      }
                    } 
                    catch (err) {
                      console.log(err)
                    }
            }
            else{
                alert('Passwords do not match');
            }
    
        }
     }
    return (
            <>
             
            
<div className="container">
  
    <div className="row py-3 mt-4 align-items-center">
        {/* <!-- For Demo Purpose --> */}
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="..\images\register.jpg" alt="" style={{height:550}} className="img-fluid mb-3 d-none d-md-block"/>
            <h1>Create an Account</h1>
           
        </div>

        {/* <!-- Registeration Form --> */}
        <div className="col-md-7 col-lg-6 ml-auto">
        <h2 style={{ marginLeft: 35 }} className="d-flex justify-content-center" > Register Here</h2>
        <br></br>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">

                    {/* <!-- Name --> */}
                    <div className="input-group col-lg-6 mt-0">
                    <div className="input-group-prepend">
                            <span  display="block" className="input-group-text bg-white border-0  d-block mt-1 ">
                               <FaUser></FaUser>
                            </span>
                        </div>
                    <input id="name" type="text" name="name" placeholder="Name" className="form-control bg-white border-left-0 border-md" {...register('name', { required: {value:true,message:"*This field is required"} })}/>
                    </div>
                    <span style={{color:'red',marginLeft: 35 }} > <ErrorMessage errors={errors} name="name" /></span>

                    {/* <!-- Gender --> */}
                    <div className="input-group col-lg-6 mt-4">
                        <div className="input-group-prepend">
                            <span  display="block" className="input-group-text bg-white border-0  d-block mt-1 ">
                               <FaUser></FaUser>
                            </span>
                        </div>
                        {/* <input id="gender" type="text" name="gender" placeholder="Gender" className="form-control bg-white border-md" {...register('gender', { required: true })}/> */}
                        <select name="gender" id="gender" placeholder="Gender"  className="form-control bg-white border-md" {...register('gender', { required: "This is required" })}>
                            <option value="">--Gender--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        </div>
                    <span style={{color:'red',marginLeft: 35}} > <ErrorMessage errors={errors} name="gender" /></span>
                    {/* <!-- Email Address --> */}
                    <div className="input-group col-lg-12 mt-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-0  d-block mt-1 ">
                            <FaEnvelope/>
                            </span>
                        </div>
                       
                        <input id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" {...register('email', 
                        {
                             required: {value:true,
                            message:"This field is required"},
                             pattern: {
                                value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message:"*Invalid Email Address"
                             }

                        })}/>
                    </div>
                    <span style={{color:'red',marginLeft: 35}}> <ErrorMessage errors={errors} name="email"  /></span>
                    {/* <!-- Age --> */}
                    <div className="input-group col-lg-12 mt-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white  border-0 mt-1">
                            <FaUser></FaUser>
                            </span>
                        </div>
     
                        <input id="age" type="number" name="age" placeholder="Age" className="form-control bg-white border-md border-left-0 pl-3" {...register('age', 
                        { 
                            required: "*This field is required",
                            min:{value:14,message:"*Age should be greater than 14"},
                            max:{value:100,message:"*Age cannot be greater than 100"},
                          
                        }
                            )}/>
                            
                    </div>
                    <span style={{color:'red',marginLeft: 35}}> <ErrorMessage errors={errors} name="age" /></span>

                  

                    {/* <!-- Password --> */}
                    <div className="input-group col-lg-6 mt-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-0 ">
                              <BsFillLockFill></BsFillLockFill>
                            </span>
                        </div>
                        <input id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" {...register('password', { required: "*This field is required" })}/>
                        </div>
                    <span style={{color:'red',marginLeft: 35}} > <ErrorMessage errors={errors} name="password" /></span>
                    {/* <!-- Password Confirmation --> */}
                    <div className="input-group col-lg-6 mt-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-0 border-right-0">
                            <BsFillLockFill></BsFillLockFill>
                            </span>
                        </div>
                        <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" {...register('passwordConfirmation', 
                        { 
                            required: "*This field is required"
                            
                        } 

                        )}/>
                    </div>
                    <span style={{color:'red',marginLeft: 35}} > <ErrorMessage errors={errors} name="passwordConfirmation" /></span>


                    {/* <!-- Submit Button --> */}
                    <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary btn-block text-uppercase text-center mt-4 rounded-pill shadow-sm" style={{ width: 330}}>Sign in</button>
                    </div>
                    

                    {/* <!-- Divider Text --> */}
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                        <div className="border-bottom w-100 ml-5"></div>
                        <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                        <div className="border-bottom w-100 mr-5"></div>
                    </div>

                   

                    
                    <div className="text-center w-100">
                        <p className="text-muted font-weight-bold">Already Registered? <a href="/login" className="text-primary ml-2">Login</a></p>
                    </div>

                </div>
            </form>
        </div>
    </div>
  
</div>


          </>
        );
}

export default RegisterForm;



