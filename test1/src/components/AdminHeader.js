
import React, {Fragment,useEffect,useState} from "react";
import{ useHistory,Link, useNavigate} from "react-router-dom";

export default function UserHeader(){
    const history=useNavigate();
    const[username,setUsername]=useState("");
    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
        
    },[]);
//console.log(username);
    const logut=(e)=>{
        e.preventDefault();
        localStorage.removeItem("username");
        history.push("/");
    };
    
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Welcome <span class="sr-only">{username}</span></a>
      </li>
      <li class="nav-item">
        <Link to="/registrationlist" className="nav-link">
            Registration Management
        </Link>
        
      </li>
      <li class="nav-item">
      <Link to="/articlelist" className="nav-link">
            Article Management
        </Link>
      </li>
      <li class="nav-item">
      <Link to="/News" className="nav-link">
            News Management
        </Link>
      </li>
      <li class="nav-item">
      <Link to="/staff" className="nav-link">
            Staff Management
        </Link>
      </li>
      
    </ul>
  </div>
</nav>
    )
}