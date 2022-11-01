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
  } from "./deleteElements";

export const Delete=()=>{
    const[values,setValues] = useState({
        username:"",
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
        if(res.status==200){
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
        <Title>Delete</Title>
        <StyledForm>
          <StyledUsernameLabel>username</StyledUsernameLabel>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="with a placeholder"
            type="text"
            onChange={handleChange}
            value={values.username}
          />

          <StyledButton onClick={handleSubmit}>Delete</StyledButton>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );


};