import axios from "axios";
import React, { useState } from "react";
import { Community } from "../../Pages/Community/Community";

import { FaTimes } from "react-icons/fa";

import {
  Title,
  ContainerDiv,
  ContainerCard,
  StyledNameLabel,
  StyledForm,
  StyledInputName,
  StyledButton,
  CustomExit,
} from "./PostFormElements";

export const PostForm = ({ isForm }) => {

  const [isCommunity, setCommunity] = useState(false); 

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [formValues, setFormValues] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const posted = {
      ...formValues,
      [name]: value,
    };

    var isFull = true;

    if (!formValues.content) {
      isFull = false;
    }

    if (isFull) {
      isForm = false;

      axios.post("http://localhost:4000/api/post", posted).then((response) => {
        window.alert(response.data.message);
        console.log(isForm);
        setCommunity(!isCommunity);
      });

    } else {
      window.alert("Please add a content dude!");
    }
  };

  return (
    <>
      {!isCommunity ? (
        <ContainerDiv>
          <ContainerCard>
            <CustomExit onClick={() => setCommunity(true)}>
              <FaTimes></FaTimes>
            </CustomExit>
            <Title>POST</Title>
            <StyledForm>
              <StyledNameLabel>Content</StyledNameLabel>
              <StyledInputName
                id="exampleContent"
                name="content"
                placeholder="Content"
                type="text"
                onChange={handleChange}
                value={formValues.content}
              />
              <StyledButton onClick={HandleSubmit}>Post</StyledButton>
            </StyledForm>
          </ContainerCard>
        </ContainerDiv>
      ) : (
        <Community />
      )}
    </>
  );
};
