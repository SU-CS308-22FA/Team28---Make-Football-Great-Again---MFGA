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
  StyledInputUsername,
  StyledUsernameLabel,
} from "./publishRewardElements";

import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components/Footer/Footer";


export const PublishReward = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    pointsNeeded: "",
  });
  const navigate = useNavigate()
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

    const award = {
      ...values,
      [name]: value,
    };
    var isAllFull = true;

    if (!values.title || !values.description || !values.image || !values.pointsNeeded) {
      isAllFull = false;
    }

    if (isAllFull) {
      axios
        .post("http://localhost:4000/api/publishAward", award)
        .then((response) => {
          //console.log(response.data.message)
            window.alert(response.data.message)
            navigate("/awards");
        });
    } else {
        window.alert("Please add all data.")
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
        <Title>Publish Award</Title>
        <StyledForm>
          <StyledNameLabel>Title</StyledNameLabel>
          <StyledInputName
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            onChange={handleChange}
            value={values.title}
          />
          
          <StyledEmailLabel>Description</StyledEmailLabel>
          <StyledInputEmail
            id="description"
            name="description"
            placeholder="Description"
            type="text"
            onChange={handleChange}
            value={values.description}
          />
          
          <StyledPassLabel>Image URL</StyledPassLabel>
          <StyledInputPass
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            name="image"
            value={values.image}
          />
          
          <StyledUsernameLabel>Points Needed</StyledUsernameLabel>
          <StyledInputUsername
            id="pointsNeeded"
            name="pointsNeeded"
            placeholder="Points Needed"
            type="text"
            onChange={handleChange}
            value={values.pointsNeeded}
          />
          <StyledButton onClick={handleSubmit}>Publish Award</StyledButton>
        </StyledForm>
      </ContainerCard>
      <Footer></Footer>
    </ContainerDiv>
  );
};
