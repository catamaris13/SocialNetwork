import React,{Fragment,useEffect,useState} from "react";
import axios from "axios";  
import AdminHeader from "./AdminHeader";
import { Table,Container,Form,InputGroup } from "react-bootstrap";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Staff(){
    
    const[Password,setPassword]=useState("");
    const[Name,setName]=useState("");
    const[Email,setEmail]=useState("");
    const[UserType,setUserType]=useState("");
    const[PhoneNo,setPhoneNo]=useState("");
    const[IsActive,setIsActive]=useState("");
    const[IsApproved,setIsApproved]=useState("");
    const[Id,setId]=useState("");
    const [data,setData]=useState([]);
    
    useEffect(()=>{
        getData();
    },[]);
   // console.log(Email);
   const getData=()=>
   {
       const url=`http://localhost:5177/api/Registration/RegistrationList`;
       const data={
           UserType:'Staff',
           Email:Email,
           Password: Password,
           Name:Name,
           PhoneNo:PhoneNo,
          // PhoneNo:PhoneNo,
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
   const clear =(e)=>{
    e.preventDefault();
    setName();
    setEmail();
    setPassword();
  }
    

    const handleSave=(e)=>{
        e.preventDefault();
        const data={
           // Id:Id,
            Name:Name,
            Email:Email,
            Password:Password,
            PhoneNo:PhoneNo,
            UserType:'Staff',
          //  IsActive:IsActive

        }
        console.log(Email);
        const url=`http://localhost:5177/api/Registration/StaffRegistration `;
        
        axios
        .post(url,data)
        .then((result)=>{
            const dt=result.data;
            
            if(dt.statusCode===200){ 
                getData();
                clear(e);
                alert("Staff Added");
            }
            else 
            {
                alert(dt.statusMessage);
            }
            
        })
        .catch((error)=>{
          //  console.log(Title);
            console.log(error);
        })
    }
    
    return(
        <Fragment>
            <AdminHeader/>
            
    <br></br> 
    <form>
    <div class="form-row" style={{ width: "80%", backgroundColor: "white", margin: " auto" }}> 
    <div class="form-group col-md-12">
        <h3>Add New Staff</h3> 
    </div>
    <br></br>
    <div className="row">
    <div class="form-group col-md-6">
        <input
        type="text"
        onChange={(e)=>setName(e.target.value)}
        placeholder="Enter Name"
        className="form-control"
        required
        value={Name}/>
    </div>
    <div class="form-group col-md-6">
        <input
        type="text"
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Enter Email"
        className="form-control"
        required
        value={Email}/>
    </div></div>
    <br></br>
    <div class="form-group col-md-12">
        <input
        type="text"
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter Password"
        className="form-control"
        required
        value={Password}/>
    </div>
    <br></br>
    <div class="form-groupv col-md-6">
        <button className="btn btn-primary" style={{width:"150px",float:"left"}}
        onClick={(e)=>handleSave(e)}>Save</button>
        {" "}
        <button className="btn btn-danger" style={{width:"150px"}}
        onClick={(e)=>clear(e)}>Reset</button>

    </div>
    </div>
    </form>
    <br></br>
            {data ? (
                <Container>
                
                <Table striped bordered hover>
                <thead> 
                    <tr>
                    <th>#</th>      
                <th>Name</th> 
                
                <th>Email</th>
                 
                 
                </tr>
                </thead> 
                <tbody>
                    {data.map((val,index)=>{
                        return (
                    <tr> 
                        <th scope="row">{index+1}</th>
                        <td>{val.name}</td>
                          <td>{val.email}</td> 
                         
                        
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