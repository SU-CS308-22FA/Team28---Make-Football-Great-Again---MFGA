import React,{ useState} from "react";
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
    StylePass,
    StyledNameError,
    StyledPassError,
    StyledUsernameError
  } from "./edit-deleteElements";

import {useNavigate} from 'react-router-dom';
import { Footer } from "../../components/Footer/Footer";


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

    const [errorName, setErrorName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorUsername, setErrorUsername] = useState("")
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const email = user.email; 


const handleDelete = (e)=>{
    e.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    axios.delete("http://localhost:4000/edit",{data: {email:email}})
    .then((res)=>{
        if(res.status===200){
            console.log("Deleted");
            //navigate('/login', {state: res.data});
        }
        else{
            console.log("Error happened, cannot delete!");
        }
    })
    .catch((err)=>{
        console.log(err);
    });
    navigate('/login');
}

const handleUpdate = (e)=>{
  e.preventDefault();

  // updated.email = email;

  setErrorName("");
  setErrorUsername("");
  setErrorPassword("");

  var isPasswordValid = false;
  var isNameValid = false;
  var isUsernameValid = false;

  if(fname === ''){
    fname = user.name;
    isNameValid = true;
  }if(uname === ''){
    uname = user.username;
    isUsernameValid = true;
  }if(pass === ''){
    pass = user.password;
    isPasswordValid = true;
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
  
  if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(pass)) { isPasswordValid = true }
  if (/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})$/.test(fname)) { isNameValid = true }
  if (/^[a-zA-Z0-9._]{1,20}$/.test(uname)) { isUsernameValid = true }

  if(isPasswordValid && isNameValid && isUsernameValid){
    //localStorage.removeItem("currentUser");
    //localStorage.removeItem("user");
    axios.post("http://localhost:4000/edit",updated)
    .then((res)=>{
        if(res.status===200){
            navigate('/profileFront')
            localStorage.setItem("currentUser", JSON.stringify({name: fname, username: uname, email: email, password: pass, role: user.role}))
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
    //navigate('/login')
  }
  else{
    if(!isPasswordValid){
      setErrorPassword("Password should be minimum 8, maximum 20 characters. It should contain at least one uppercase letter, lowercase letter and digit.");
    }
    if(!isNameValid){
      setErrorName("Name must contain only alphabetical characters. Each name must be at least 3 characters lenght.")
    }
    if(!isUsernameValid){
      setErrorUsername("Username must contain only alphanumeric characters \"_\" and \".\". Username must be maximum 20 characters lenght.")
    }
  }

  
/*
  setValues({
      username:"",
      name:"",
      password:"",
  });*/
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
            placeholder= {user.username}
            type="text"
            value={uname}
            onChange={(e) => 
            {
              if(e === "")
              {setUsername(user.username)}
              else{setUsername(e.target.value)}
            }
            }
          />
          <StyledUsernameError>{errorUsername}</StyledUsernameError>
          <br/>
          <StyleName>Name:</StyleName>
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder={user.name}
            type="text"
            value={fname}
            onChange={(e) => 
            {
              if(e ==="")
              {setFullname(user.name)}
              else{setFullname(e.target.value)}
            }
            }
          />
          <StyledNameError>{errorName}</StyledNameError>
          <br/>
          <StylePass>Password:</StylePass>
          <StyledInputPassword
            id="examplePassword"
            name="password"
            placeholder={user.password}
            type="text"
            value={pass}
            onChange={(e) => 
            {
              if(e ==="")
              {setPass(user.password)}
              else{setPass(e.target.value)}
            }
            }
          />
          <StyledPassError>{errorPassword}</StyledPassError>
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
          <StyledButton2 onClick={handleUpdate}>Update</StyledButton2>
        </StyledForm>
      </ContainerCard>
      <Footer></Footer>
    </ContainerDiv>
  );


};