//Alper Kaan
import React, { useState } from "react";
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
  Error,
} from "./loginElements";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState("");

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
    const logedIn = {
      ...values,
      [name]: value,
    };

    if (values.email === "" || values.password === "") {
      //console.log("Please fill all of your information");

      setError("Please fill all your information");

      console.log(errors);
    } else {
      axios
        .post("http://localhost:4000/login", logedIn)
        .then((response) => {
          if (response.data.message === "Loged in successfully") {
            console.log("Logged in");
            setError("")
          }else if(response.data.message === "There is no user exist with this email and password"){
            setError("No user exist with this email and password")
            console.log(response.data.message)
          }else{
            setError("Incorrect email or password")
            console.log(response.data.message)
          }
        }).catch((err) => {
          setError("No user exist with this email and password")
          console.log(err)
        })
        .catch((err) => {
          console.log(err)
        });
      // setValues({
      //   email: "",
      //   password: "",
      // });
    }
  };

  return (
    <ContainerDiv>
      <ContainerCard>
        <Title>Login</Title>
        <Error>{errors}</Error>
        <StyledForm>
          <StyledEmailLabel>email</StyledEmailLabel>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            type="email"
            placeholder="@mail.com"
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
