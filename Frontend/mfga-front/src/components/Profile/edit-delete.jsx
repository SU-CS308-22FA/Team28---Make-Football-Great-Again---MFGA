import React,{useState} from "react";
import axios from "axios";
import {
    Title,
    ContainerDiv,
    ContainerCard,
    StyledUsernameLabel,
    StyledForm,
    StyledInputUsername,
    StyledButton,
    StyledInputName,
    StyledInputPassword,
    StyledButton2,
    StyleUsername,
    StyleName,
    StylePass

  } from "./edit-deleteElements";

import {useNavigate, useLocation} from 'react-router-dom';

export const Edit_Delete=()=>{
    const[values,setValues] = useState({
        username:"",
        password:"",
        name:"",
        email:""
    });

    var [pass, setPass] = useState("")
    var [uname, setUsername] = useState("")
    var [fname, setFullname] = useState("")

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state.email;
    

const handleDelete = (e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    const deleted={
        ...values,
        [name]:value,
        
    };




    axios.delete("https://mfga.herokuapp.com/edit",{data: {email:email}})
    .then((res)=>{
        if(res.status===200){
            console.log("Deleted");
            navigate('/login', {state: res.data});
        }
        else{
            console.log("Error happened, cannot delete!");
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}

const handleUpdate = (e)=>{
  e.preventDefault();

  // updated.email = email;

  if(fname === ''){
    fname = location.state.name;
  }if(uname === ''){
    uname = location.state.username;
  }if(pass === ''){
    pass = location.state.password;
  }

  console.log("Pass is" + pass)
  console.log("username is" + uname)
  console.log("fname is" + fname)

  const updated={
    name: fname,
    username: uname,
    email: email,
    password: pass,
  };

  console.log()
  

  axios.post("https://mfga.herokuapp.com/edit",updated)
  .then((res)=>{
      if(res.status===200){
          navigate('/login')
          window.alert("User is updated! Please login with new information")
          console.log("Updated!");
      }
      else{
          console.log("Error happened, cannot update!");
      }
  })
  .catch((err)=>{
      console.log(err);
  });

  setValues({
      username:"",
      name:"",
      password:"",
  });
}

return (
    <ContainerDiv>
      <ContainerCard>
        <Title>Edit</Title>
        <StyledForm>
          <StyledUsernameLabel>User email: {email}</StyledUsernameLabel>
          <br/>
          <StyleUsername>Username:</StyleUsername>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder= {location.state.username}
            type="text"
            value={uname}
            onChange={(e) => 
            {
              if(e ==="")
              {setUsername(location.state.username)}
              else{setUsername(e.target.value)}
            }
            }
          />
          <br/>
          <StyleName>Name:</StyleName>
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder={location.state.name}
            type="text"
            value={fname}
            onChange={(e) => 
            {
              if(e ==="")
              {setFullname(location.state.name)}
              else{setFullname(e.target.value)}
            }
            }
          />
          <br/>
          <StylePass>Password:</StylePass>
          <StyledInputPassword
            id="examplePassword"
            name="password"
            placeholder={location.state.password}
            type="text"
            value={pass}
            onChange={(e) => 
            {
              if(e ==="")
              {setPass(location.state.password)}
              else{setPass(e.target.value)}
            }
            }
          />

          <StyledButton onClick={handleDelete}>Delete</StyledButton>
          <StyledButton2 onClick={handleUpdate}>Update</StyledButton2>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );


};