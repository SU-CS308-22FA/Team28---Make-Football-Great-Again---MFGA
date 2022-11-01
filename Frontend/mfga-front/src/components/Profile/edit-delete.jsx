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

  } from "./edit-deleteElements";

export const Edit_Delete=()=>{
    const[values,setValues] = useState({
        username:"",
        password:"",
        name:"",
        email:""
    });


const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
        ...values,
        [name]:value,
    });
};

const handleDelete = (e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    const deleted={
        ...values,
        [name]:value,
        
    };




    axios.delete("http://localhost:4000/edit",{data: {username:deleted.username}})
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

const handleUpdate = (e)=>{
  e.preventDefault();
  const {name,value}=e.target;
  const updated={
      ...values,
      [name]:value,
      
  };




  axios.post("http://localhost:4000/edit",updated)
  .then((res)=>{
      if(res.status===200){
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
          <StyledUsernameLabel>Email</StyledUsernameLabel>
          <br/>

          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <br/>
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
          <br/>

          <StyledInputPassword
            id="examplePassword"
            name="password"
            placeholder="password"
            type="text"
            onChange={handleChange}
            value={values.password}
          />

          <StyledButton onClick={handleDelete}>Delete</StyledButton>
          <StyledButton2 onClick={handleUpdate}>Update</StyledButton2>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );


};