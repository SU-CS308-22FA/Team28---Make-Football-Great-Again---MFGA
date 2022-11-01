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
} from "./loginElements";
import { Input, NavItem, NavLink } from "reactstrap";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setError] = useState({
    errorMessage: "",
  })

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

    axios
      .post("http://localhost:4000/login", logedIn)
      .then((response) => {
        if (response.status === 200) {
          console.log("Logged in");
        } else {
          console.log("There is an error");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <ContainerDiv>
      <ContainerCard>
        <Title>Login</Title>
        <StyledForm>
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
          <StyledButton onClick={handleSubmit}>Sign-in</StyledButton>
          <StyledP>
            If you don't <br /> have an account
          </StyledP>
          <StyledHr />
          <StyledNavLink active href="/signup">
            Register
          </StyledNavLink>
        </StyledForm>
      </ContainerCard>
    </ContainerDiv>
  );
};
