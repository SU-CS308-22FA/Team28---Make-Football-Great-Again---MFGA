import styled from "styled-components";
import { Button, Card, Form, Input, Label, NavLink } from "reactstrap";

export const ContainerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  margin: 0;
  padding: 0;

  height: 100%;
  width: 100%;

  justify-content: center;

  z-index: 0;
  overflow-x: auto;
  background: #EAE7E7;
  flex: 1;
`;

export const ContainerCard = styled(Card)`
  position: relative;
  height: 43.75rem;
  width: 27rem;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.5);
  top: 6.5rem;

  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 32px 0 rgba(50, 50, 100, 0.37);
`;

export const Title = styled.h1`
  position: absolute;
  top: 20px;
  left: 20%;
  right: 20%;

  color: rgb(0, 0, 0, 0.5);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-align: center;

  font-size: 2.18rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

export const StyledForm = styled(Form)`
  width: 90%;
  height: 70%;
  position: absolute;
  top: 8rem;
  left: 1.6rem;
  right: 1.6rem;
`;

export const StyledInputName = styled(Input)`
  position: absolute;
  top: 0rem;
  left: 3rem;
  width: 80%;

  border: none;
  border-radius: 1rem;
  padding: 10px 16px 10px 16px;
  background: rgb(0, 0, 0, 0.1);
`;

export const StyledInputEmail = styled.input`
  position: absolute;
  top: 6rem;
  left: 3rem;
  width: 80%;
  height: 9%;

  border: none;
  border-radius: 1rem;
  padding: 10px 16px 10px 16px;

  background: rgb(0, 0, 0, 0.1);
`;

export const StyledInputPass = styled(Input)`
  position: absolute;
  top: 12rem;
  left: 3rem;
  width: 80%;

  border: none;
  border-radius: 1rem;
  padding: 10px 16px 10px 16px;

  background: rgb(0, 0, 0, 0.1);
`;

export const StyledInputUsername = styled(Input)`
  position: absolute;
  top: 18rem;
  left: 3rem;
  width: 80%;

  border: none;
  border-radius: 1rem;
  padding: 10px 16px 10px 16px;
  background: rgb(0, 0, 0, 0.1);
`;

export const StyledNameLabel = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: -2rem;

  font-size: 1.3rem;

  color: rgb(0, 0, 0, 0.5);
`;

export const StyledEmailLabel = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 4rem;

  font-size: 1.3rem;

  color: rgb(0, 0, 0, 0.5);
`;

export const StyledPassLabel = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 10rem;

  font-size: 1.3rem;

  color: rgb(0, 0, 0, 0.5);
`;
export const StyledUsernameLabel = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 16rem;

  font-size: 1.3rem;

  color: rgb(0, 0, 0, 0.5);
`;

export const StyledNameError = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 3rem;
  text-align: center;
  font-size: 10px;
  color: red;
`;

export const StyledEmailError = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 8.8rem;
  text-align: center;
  font-size: 10px;
  color: red;
`;

export const StyledPassError = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 14.8rem;
  text-align: center;
  font-size: 10px;
  color: red;
`;

export const StyledUsernameError = styled(Label)`
  position: absolute;
  left: 1.5rem;
  top: 21rem;
  text-align: center;
  font-size: 10px;
  color: red;
`;


export const StyledButton = styled(Button)`
  position: absolute;
  top: 24rem;
  display: flex;
  width: 50%;
  height: 35px;
  left: 6rem;

  border: none;
  justify-content: center;

  color: rgb(0, 0, 0, 0.5);

  background: linear-gradient(to right, #ff3838 0%, #ff4d4d 0%, #ffffff 2000%);
`;

export const StyledHr = styled.hr`
  top: 30rem;
  left: 25%;
  position: absolute;
  width: 50%;
  height: 1px;

  color: black;
`

export const StyledP = styled.p`
  top: 27rem;
  left: 25%;
  position: absolute;
  width: 50%;
  height: 1px;
  color: black;
  text-align: center;
`

export const StyledNavLink = styled(NavLink)`
  position: absolute;
  top: 32rem;
  left: 43%;
  color: #ff3838;
`