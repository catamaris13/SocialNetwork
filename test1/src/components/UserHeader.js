
import React, {useEffect,useState} from "react";
import{ useHistory,Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function UserHeader(){
    const history=useNavigate();
    const[username,setUsername]=useState("");
    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
        
    },[]);
console.log(username);
    const logut=(e)=>{
        e.preventDefault();
        localStorage.removeItem("username");
        history("/");
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
              <a class="nav-link" href="#">Home <span class="sr-only">({username})</span>{}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Add article</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">News</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
      

    )
}
