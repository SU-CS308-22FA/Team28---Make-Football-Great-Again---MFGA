//Alper Kaan
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaKey, FaEnvelope, FaLock } from "react-icons/fa";

import {
  Key,
  ContainerDiv,
  ContainerCard,
  StyledForm,
  StyledInputEmail,
  StyledInputPass,
  StyledButton,
  StyledHr,
  StyledP,
  StyledNavLink,
  Error,
  LoginCaptureDiv,
  UserAvatar,
  BubbleDiv1,
  BubbleDiv2,
  Email,
  Pass,
  StyledDiv,
} from "./loginElements";
import { Footer } from "../../components/Footer/Footer";
import AuthContext from "../../context/AuthContext";
import LoginAnimation from "../../components/SoccerLoginAnimation/LoginAnimation";


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
        .post("https://mfga.herokuapp.com/login", logedIn, {withCredentials: true})
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
          else if(response.data.user.role === 1){
            console.log("Admin logged in");
            setError("")
            localStorage.setItem("currentUser", JSON.stringify({name: response.data.user.name, username: response.data.user.username, email: response.data.user.email, password: response.data.user.password, role: response.data.user.role,team: response.data.user.team}))
            localStorage.setItem("user", response.data.user);
            navigate("/admin", {state: response.data});


          }
          else if(response.data.user.role === 2){
            console.log("Board Member logged in");
            setError("")
            localStorage.setItem("currentUser", JSON.stringify({name: response.data.user.name, username: response.data.user.username, email: response.data.user.email, password: response.data.user.password, role: response.data.user.role,team: response.data.user.team}))
            localStorage.setItem("user", response.data.user);
            navigate("/board", {state: response.data});


          }
          else if(response.data.user.role === 3){
            console.log("Referee logged in");
            setError("")
            localStorage.setItem("currentUser", JSON.stringify({name: response.data.user.name, username: response.data.user.username, email: response.data.user.email, password: response.data.user.password, role: response.data.user.role,team: response.data.user.team}))
            localStorage.setItem("user", response.data.user);
            navigate("/refereeProfile", {state: response.data});


          }
          else{
            console.log(response.data)
            console.log("Logged in");
            setError("")
            localStorage.setItem("currentUser", JSON.stringify({name: response.data.user.name, username: response.data.user.username, email: response.data.user.email, password: response.data.user.password, role: response.data.user.role,team: response.data.user.team}))
            localStorage.setItem("user", response.data.user);
            navigate("/profileFront", {state: response.data});
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
        <UserAvatar src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png" alt="profile pic"></UserAvatar>
        <LoginCaptureDiv></LoginCaptureDiv>
        <BubbleDiv1></BubbleDiv1>
        <BubbleDiv2></BubbleDiv2>
        <Key><FaKey></FaKey></Key>
        <Email><FaEnvelope></FaEnvelope></Email>
        <Pass><FaLock></FaLock></Pass>
        <Error>{errors}</Error>
        <LoginAnimation></LoginAnimation>
        <StyledForm>
          <StyledInputEmail
            id="exampleEmail"
            name="email"
            type="email"
            placeholder="@mail.com"
            onChange={handleChange}
            value={values.email}
          />
          <StyledInputPass
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={values.password}
          />
          <StyledButton onClick={handleSubmit}>Sign-in</StyledButton>
          <StyledP>
            don't have an account?
          </StyledP>
          <StyledNavLink active href="/signup">
            Register
          </StyledNavLink>
        </StyledForm>
      </ContainerCard>
      
    </ContainerDiv>
    
  );
};