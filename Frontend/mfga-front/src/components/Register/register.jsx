import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "reactstrap";
import {
  Title,
  ContainerDiv,
  ContainerCard,
  StyledEmailLabel,
  StyledPassLabel,
  StyledNameLabel,
  StyledForm,
  StyledInputName,
  StyledInputEmail,
  StyledInputPass,
  StyledButton,
  StyledHr,
  StyledP,
  StyledNavLink,
  StyledInputUsername,
  StyledUsernameLabel,
} from "./registerElements";
import { Input, NavItem } from "reactstrap";
import { useNavigate } from 'react-router-dom';


export const Register = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const registered = {
      ...values,
      [name]: value,
    }

    var isEmailValid = false;
    var isAllFull = true;

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) { isEmailValid = true }

    if(!values.name || !values.email || !values.password || !values.username){
      isAllFull = false;
    }
    
    if(isEmailValid && isAllFull){
      axios.post("https://mfga.herokuapp.com/signup", registered)
      .then((response) => {
        navigate('/login', {state: response.data})
      });
    }
    else{
      if(!isAllFull){
        window.alert("Please add all data.");
      }
      else if(!isEmailValid){
        window.alert("Please enter a valid email.");
      }
    }
    setValues({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (

    <ContainerDiv>
      <ContainerCard>
        <Title>Signup</Title>
        <StyledForm>
          <StyledNameLabel>full name</StyledNameLabel>
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder="Full Name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
          <StyledEmailLabel>email</StyledEmailLabel>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            placeholder="email"
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
          <StyledUsernameLabel>username</StyledUsernameLabel>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <StyledButton onClick={handleSubmit}>Sign-up</StyledButton>
          <StyledP>
            Do you <br /> have an account?
          </StyledP>
          <StyledHr />
          <StyledNavLink active href="/login">
            Login
          </StyledNavLink>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );
};