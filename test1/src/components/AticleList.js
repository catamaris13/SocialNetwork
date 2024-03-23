import React,{Fragment,useEffect,useState} from "react";
import axios from "axios";  
import AdminHeader from "./AdminHeader";
import { Table,Container,Form,InputGroup } from "react-bootstrap";

export default function ArticleList(){
    
    const [data,setData]=useState([]);
    const[role,setRole]=useState("");
    const[Email,setEmail]=useState("");
    const[Title,setTitle]=useState("");
    const[Content,setContent]=useState("");
    const[Image,setImage]=useState("");
    const[isApproved,setisApproved]=useState("");

    useEffect(()=>{
        getData();
        setRole(localStorage.getItem("username"));
        
    },[]);
   

    const getData=()=>
    {
        const data={
            type:"Page",
            Email:Email,
            Title: Title,
      Content: Content,
      Image: Image,
      //isApproved:isApproved
        }
        const url=`http://localhost:5177/api/Article/ArticleList`;
        
        axios
        .post(url,data)
        .then((result)=>{
            const data=result.data;
            if(data.statusCode===200)
            setData(data.listArticle);
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
            Title: Title,
      Content: Content,
      Image: Image,
      type:"Page",
    
        };
        const url=`http://localhost:5177/api/Article/ArticleApproval`;
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
                <th>Title</th> 
                <th>Content</th> 
                <th>Email</th>
                 <th>Image</th>
                 <th>isApproved</th>
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
                          <td>{val.image}</td>
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