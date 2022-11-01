import React,{useState} from "react";
import axios from "axios";
import {
    Title,
    ContainerDiv,
    ContainerCard,
    StyledEmailLabel,
    StyledPassLabel,
    StyledForm,
    StyledInputEmail,
    StyledInputPass,
    StyledButton,
    StyledHr,
    StyledP,
    StyledNavLink,
  } from "./deleteElements";

const Delete=()=>{
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




    axios.delete("http://localhost:4000/delete")
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
        <Title>Login</Title>
        <StyledForm>
          <StyledEmailLabel>email</StyledEmailLabel>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          <StyledPassLabel>password</StyledPassLabel>
          <StyledInputPass
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={values.password}
          />
          <StyledButton onClick={handleSubmit}>Sign-in</StyledButton>
          <StyledP>
            If you don't <br /> have an account
          </StyledP>
          <StyledHr />
          <StyledNavLink active href="#">
            Register
          </StyledNavLink>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );


};