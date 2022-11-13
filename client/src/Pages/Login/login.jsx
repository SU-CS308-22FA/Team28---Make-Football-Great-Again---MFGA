//Alper Kaan
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
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
    const logedIn = {
      ...values,
      [name]: value,
    };

    var isEmailValid = false;

    for(let i = 0; i < values.email.length ; i++ ){
      //console.log(values.email[i])
      if(values.email[i] === '@'){
        isEmailValid = true;
      }
    }

    if (values.email === "" || values.password === "") {
      //console.log("Please fill all of your information");

      setError("Please fill all your information");

      //console.log(errors);
    }else if(!isEmailValid){
      setError("Please enter a valid email");
      console.log("Wrong email")
    } else {
      axios
        .post("http://localhost:4000/login", logedIn)
        .then((response) => {
          if(response.data.message === "There is no user exist with this email and password"){
            setError("No user exist with this email and password")
            console.log(response.data.message)
          }else if(response.data.message === "Invalid email or password"){
            setError("Incorrect email or password")
            console.log(response.data.message)
          }
          else if(response.data.message === "User has been banned"){
            setError("User has been banned.")
            console.log(response.data.message)

          }
          else if(response.data.role === 1){
            console.log("Admin logged in");
            setError("")
            navigate("/admin", {state: response.data});


          }
          else if(response.data.role === 2){
            console.log("Board Member logged in");
            setError("")
            navigate("/board", {state: response.data});


          }
          else{
            console.log(response.data)
            console.log("Logged in");
            setError("")
            navigate("/edit", {state: response.data});
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
          <StyledNavLink active href="/signup">
            Register
          </StyledNavLink>
        </StyledForm>
      </ContainerCard>
      <Footer></Footer>
    </ContainerDiv>
    
  );
};