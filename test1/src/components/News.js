import React,{Fragment,useEffect,useState} from "react";
import axios from "axios";  
import AdminHeader from "./AdminHeader";
import { Table,Container,Form,InputGroup } from "react-bootstrap";
import { clear } from "@testing-library/user-event/dist/clear";

export default function News(){
    
    
    const [Title,setTitle]=useState('');
    const [Content,setContent]=useState('');
    const [CreatedOn,setCreatedOn]=useState('');
    const [IsActive,setIsActive]=useState('');
    const[Email,setEmail]=useState("");
    const[Id,setId]=useState("");
    const [data,setData]=useState([]);
    
    useEffect(()=>{
        getData();
        setEmail(localStorage.getItem("username"));
    },[]);
   // console.log(Email);
    const getData=()=>
    {
        const url=`http://localhost:5177/api/News/NewsList`;
        axios
        .get(url)
        .then((result)=>{
            const data=result.data;
            if(data.statusCode===200)
            setData(data.listNews);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const clear =()=>{
        setTitle('');
        setContent(''); 
      }
    

    const handleSave=(e)=>{
        e.preventDefault();
        const data={
            title:Title,
            content:Content,
            Email:Email,
          //  Id:Id,
          //  IsActive:IsActive,
            CreatedOn:CreatedOn
            
            

        }
        console.log(Email);
        const url=`http://localhost:5177/api/News/AddNews`;
        
        axios
        .post(url,data)
        .then((result)=>{
            const dt=result.data;
            
            if(dt.statusCode===200){
                
                getData();
                clear()
                alert("News Added");
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
        <h3>Add News</h3> 
    </div>
    <div class="form-group col-md-12">
        <input
        type="text"
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter Title"
        className="form-control"
        required
        value={Title}/>
    </div>
    <br></br>
    <div class="form-group col-md-12">
        <textarea class="form-control" id="validationTextarea"
        placeholder="Enter Content"
        rows={5}
        onChange={(e)=>setContent(e.target.value)}required
        value={Content}></textarea>
        
    </div>
    <br></br>
    <div class="form-groupv col-md-6">
        <button className="btn btn-primary" style={{width:"150px",float:"left"}}
        onClick={(e)=>handleSave(e)}>Save</button>
        {" "}
        <button className="btn btn-danger" style={{width:"150px"}}
        onClick={(e)=>clear()}>Reset</button>

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
                <th>Titlu</th> 
                <th>Content</th> 
                <th>Email</th>
                 <th>Created On</th>
                 
                </tr>
                </thead> 
                <tbody>
                    {data.map((val,index)=>{
                        return (
                    <tr> 
                        <th scope="row">{index+1}</th>
                        <td>{val.title}</td>
                         <td>{val.content}</td>
                          <td>{val.email}</td> 
                          <td>{val.createdOn}</td>
                        
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