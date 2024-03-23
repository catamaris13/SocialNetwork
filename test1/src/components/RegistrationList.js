import React,{Fragment,useEffect,useState} from "react";
import{ useHistory,Link, useNavigate} from "react-router-dom";
import axios from "axios";  
import { Navbar, Nav, Button } from 'react-bootstrap';
import AdminHeader from "./AdminHeader";
import { Table,Container,Form,InputGroup } from "react-bootstrap";

export default function RegistrationList(){
    
    const [data,setData]=useState();
    const[username,setUsername]=useState('');
    const[Id,setId]=useState("");
    const [Name,setName]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [PhoneNo,setPhoneNo]=useState('')
  const [UserType,setUserTyoe]=useState('')
  const[isApproved,setisApproved]=useState("");

    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
        
    },[]);
    useEffect(()=>{
        getData();
    },[]);

    const getData=()=>
    {
        const url=`http://localhost:5177/api/Registration/RegistrationList`;
        const data={
            UserType:'USER',
            
            Email:Email,
            Password: Password,
            Name:Name,
            PhoneNo:PhoneNo,
            //isApproved:isApproved
            
            
        }
        axios
        .post(url,data)
        .then((result)=>{
            const data=result.data;
            if(data.statusCode===200)
            setData(data.listRegistration);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleApprovae=(e,id)=>{
        e.preventDefault();
        const data={
            Id:id,
            Email:Email,
            Password: Password,
            Name:Name,
            PhoneNo:PhoneNo,
            UserType:UserType
    
        };
        const url=`http://localhost:5177/api/Registration/UserApproval`;
        axios
        .post(url,data)
        .then((result)=>{
            const dt=result.data;
            console.log("Response data:", result.data); // Inside your .then() block in getData()

            if(dt.statusCode===200)
            {
                alert('Approved')
                getData();
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return(
        <Fragment>
            <AdminHeader/>
            {data ? (
                <Container>
                <Form>
                <InputGroup className='my-3'>
                <Form.Control placeholder='Search contacts' />
                </InputGroup>
                </Form>
                <Table striped bordered hover>
                <thead> 
                    <tr>
                    <th>#</th>      
                <th>Name</th> 
                <th>Email</th> 
                <th>PhoneNo</th>
                 <th>userType</th>
                 <th>isApproved</th>
                </tr>
                </thead> 
                <tbody>
                    {data.map((val,index)=>{
                        return (
                    <tr> 
                        <th scope="row">{index+1}</th>
                        <td>{val.name}</td>
                         <td>{val.email}</td>
                          <td>{val.PhoneNo}</td> 
                          <td>{val.userType}</td>
                          <td>{val.isApproved}</td>
                          <td>
                            {val.isApproved===0 ?
                            <button className="btn btn-primary" onClick={(e)=> handleApprovae(e,val.id)}>
                                Mark Approved
                            </button>
                            :
                            "Already Approved"
                            }
                          </td>
                   </tr>)
                }
                )}

                     </tbody>
                </Table>
                </Container>
            ):
            "Nu sunt date"}
        </Fragment>
    )
}