import React, { useState } from "react";
import axios from 'axios';

import{ useNavigate} from "react-router-dom";


function Login()
{
const history=useNavigate();
  const [Name,setName]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [PhoneNo,setPhoneNo]=useState('')
  const [UserType,setUserTyoe]=useState('')
  const[IsApproved,setIsApproved]=useState('')

     const Registration = (e)=>{
      history("registration");
     }

    const UserLogin = (e)=>{
        
        e.preventDefault();
        console.log(Email,Password);
        
        const data ={
          Name:Name,
          Email:Email,
          Password:Password,
          PhoneNo:PhoneNo,
          UserType:UserType,
         
        }
        const url=`http://localhost:5177/api/Registration/Login`;
        axios.post(url,data)
        .then((result)=>{
            const dt=result.data;
            
            if(dt.statusCode===200)
            {
              if(Email==="admin" && Password==="admin"){
                localStorage.setItem("username",Email);
                
              history("/admindashboard");
 
            }
            else {
              
              
                localStorage.setItem("loggedEmail",Email);
                localStorage.setItem("username",dt.registration.Name);

                 if(dt.registration.userType==='STAFF')
              
              
              history("/staffdashboard");
            else history("/userdashboard")
            }
          }
          else
          if(dt.statusCode===101)
              {
                alert("Registration Pending")
              }
              else
          
            alert(dt.statusMessage);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    return (
        <div>
        <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone "></img>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" onChange={(e)=>setEmail(e.target.value)} />
            <label class="form-label" for="form1Example13">Email address</label>
          </div>

          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" onChange={(e)=>setPassword(e.target.value)}/>
            <label class="form-label" for="form1Example23">Password</label>
           </div>

           <div class="d-flex justify-content-around align-items-center mb-4">
        
            <a href="#!">Forgot password?</a>
           </div>

     
           <button type="submit" class="btn btn-primary btn-lg btn-block" onClick={(e)=> UserLogin(e)}>Log in</button>
             
           <button type="submit" class="btn btn-primary btn-lg btn-block" onClick={(e)=> Registration(e)}>Register</button>
           <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
           </div>

           <a class="btn btn-primary btn-lg btn-block" style={{'background-color': '#3b5998'}} href="#!"
            role="button">
            <i class="fab fa-facebook-f me-2"></i>Continue with Facebook
           </a>
           <a class="btn btn-primary btn-lg btn-block" style={{'background-color': '#55acee'}} href="#!"
            role="button">
            <i class="fab fa-twitter me-2"></i>Continue with Twitter</a>

        </form>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Login;