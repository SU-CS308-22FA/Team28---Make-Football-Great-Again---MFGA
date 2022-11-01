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
    StyledButton2

  } from "./deleteElements";

export const Delete=()=>{
    const[values,setValues] = useState({
        username:"",
        password:"",
        name:"",
    });


const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
        ...values,
        [name]:value,
    });
};

const handleSubmit = (e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    const deleted={
        ...values,
        [name]:value,
    };




    axios.delete("http://localhost:4000/delete",deleted)
    .then((res)=>{
        if(res.status===200){
            console.log("Deleted");
        }
        else{
            console.log("Error happened, cannot delete!");
        }
    })
    .catch((err)=>{
        console.log(err);
    });

    setValues({
        username:"",
    });
}

return (
    <ContainerDiv>
      <ContainerCard>
        <Title>Edit</Title>
        <StyledForm>
          <StyledUsernameLabel>Email</StyledUsernameLabel>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
          <StyledInputPassword
            id="examplePassword"
            name="password"
            placeholder="password"
            type="text"
            onChange={handleChange}
            value={values.password}
          />

          <StyledButton onClick={handleSubmit}>Delete</StyledButton>
          <StyledButton2 onClick={handleSubmit}>Update</StyledButton2>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );


};