import React, { useState } from "react";
import axios from "axios";

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
  StyledEmailError,
  StyledNameError,
  StyledPassError,
  StyledUsernameError,
} from "./registerElements";

import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

export const Register = () => {
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
    };
    registered.role = 0
    registered.status = 1


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
        .post("http://localhost:4000/signup", registered)
        .then((response) => {
          if(response.data.message === "User already exists with that email"){
            window.alert("User already exists with that email")
          }else {
            window.alert("User successfully registered to the system")
            navigate("/login", { state: response.data });
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
          <StyledNameError>{errorName}</StyledNameError>
          <StyledEmailLabel>email</StyledEmailLabel>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            placeholder="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          <StyledEmailError>{errorEmail}</StyledEmailError>
          <StyledPassLabel>password</StyledPassLabel>
          <StyledInputPass
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={values.password}
          />
          <StyledPassError>{errorPassword}</StyledPassError>
          <StyledUsernameLabel>username</StyledUsernameLabel>
          <StyledInputUsername
            id="exampleUsername"
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={values.username}
          />
          <StyledUsernameError>{errorUsername}</StyledUsernameError>
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
