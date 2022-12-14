import React, { useState } from "react";
import axios from "axios";

import {
  Title,
  ContainerCard,
  StyledEmailLabel,
  StyledPassLabel,
  StyledNameLabel,
  StyledForm,
  StyledInputName,
  StyledInputEmail,
  StyledInputPass,
  StyledButton,
  StyledInputUsername,
  StyledUsernameLabel,
  StyledEmailError,
  StyledNameError,
  StyledPassError,
  StyledUsernameError,
} from "./registerBoardMemberElements";


export const RegisterBoard =()=> {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    status: 1,
    role: 0
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");


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
    };
    registered.status = 1
    registered.role = 2


    setErrorEmail("");
    setErrorName("");
    setErrorUsername("");
    setErrorPassword("");

    var isEmailValid = false;
    var isPasswordValid = false;
    var isNameValid = false;
    var isUsernameValid = false;
    var isAllFull = true;

    if (
      /(^[a-zA-Z0-9]{3,})+@[a-zA-Z0-9]+\.([A-Za-z]{2,})+$/.test(values.email)
    ) {
      isEmailValid = true;
    }
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(values.password)) {
      isPasswordValid = true;
    }
    if (
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})$/.test(
        values.name
      )
    ) {
      isNameValid = true;
    }
    if (/^[a-zA-Z0-9._]{1,20}$/.test(values.username)) {
      isUsernameValid = true;
    }

    if (!values.name || !values.email || !values.password || !values.username) {
      isAllFull = false;
    }

    if (
      isEmailValid &&
      isAllFull &&
      isPasswordValid &&
      isNameValid &&
      isUsernameValid
    ) {

      axios
        .post("http://localhost:4000/api/admin", registered)
        .then((response) => {
          if(response.data.message === "User already exists with that email"){
            window.alert("Board Member already exists with that email")
          }else {
            window.alert("Board Member successfully registered to the system")
            
          }
        });
    } else {
      if (!isAllFull) {
        window.alert("Please add all data.");
      } else {
        if (!isEmailValid) {
          setErrorEmail(
            'Please enter a valid email. It should contain alphanumeric characters, "@" and ".". It should contain at least 3 characters before "@" and 2 characters after ".".'
          );
        }
        if (!isPasswordValid) {
          setErrorPassword(
            "Password should be minimum 8, maximum 20 characters. It should contain at least one uppercase letter, lowercase letter and digit."
          );
        }
        if (!isNameValid) {
          setErrorName(
            "Name must contain only alphabetical characters. Each name must be at least 3 characters lenght."
          );
        }
        if (!isUsernameValid) {
          setErrorUsername(
            'Username must contain only alphanumeric characters "_" and ".". Username must be maximum 20 characters lenght.'
          );
        }
      }
    }
    /*
    setValues({
      name: "",
      username: "",
      email: "",
      password: "",
    });*/
  };

  return (
      <ContainerCard>
        <Title>Board Member Register</Title>
        <StyledForm>
          <StyledNameLabel>Full Name</StyledNameLabel>
          <StyledInputName
            id="exampleName"
            name="name"
            placeholder="Full Name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
          <StyledNameError>{errorName}</StyledNameError>
          <StyledEmailLabel>Email</StyledEmailLabel>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            placeholder="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          <StyledEmailError>{errorEmail}</StyledEmailError>
          <StyledPassLabel>Password</StyledPassLabel>
          <StyledInputPass
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={values.password}
          />
          <StyledPassError>{errorPassword}</StyledPassError>
          <StyledUsernameLabel>Username</StyledUsernameLabel>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <StyledUsernameError>{errorUsername}</StyledUsernameError>
          <StyledButton onClick={handleSubmit}>Register</StyledButton>
        </StyledForm>
      </ContainerCard>
  );
};
