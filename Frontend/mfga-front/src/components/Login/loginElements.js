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
  background: linear-gradient(
    to bottom,
    #ff3838 0%,
    #ff4d4d 15.48%,
    #ffffff 90%
  );
  flex: 1;
`;

export const ContainerCard = styled(Card)`
  position: relative;
  height: 700px;
  width: 450px;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.5);
  border-top-right-radius: 17%;
  border-bottom-left-radius: 20%;
  border-top-left-radius: 10%;
  top: 8rem;

  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 32px 0 rgba(50, 50, 100, 0.37);
`;

export const Title = styled.h1`
  position: absolute;
  top: 50px;
  left: 20%;
  right: 20%;

  color: rgb(0, 0, 0, 0.5);
  text-decoration: underline;
  text-decoration-thickness: 1px;

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

export const StyledInputEmail = styled(Input)`
  position: absolute;
  top: 7rem;
  left: 3rem;
  width: 80%;

  border: none;

  background: rgb(0, 0, 0, 0.1);
`;

export const StyledInputPass = styled(Input)`
  position: absolute;
  top: 14rem;
  left: 3rem;
  width: 80%;

  border: none;

  background: rgb(0, 0, 0, 0.1);
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
  top: 11rem;

  font-size: 1.3rem;

  color: rgb(0, 0, 0, 0.5);
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: 21rem;
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
  top: 27.5rem;
  left: 25%;
  position: absolute;
  width: 50%;
  height: 1px;

  color: black;
`

export const StyledP = styled.p`
  top: 25rem;
  left: 25%;
  position: absolute;
  width: 50%;
  height: 1px;
  color: black;
`

export const StyledNavLink = styled(NavLink)`
  position: absolute;
  top: 29rem;
  left: 43%;
  color: #ff3838;
`

export const Error = styled.p`
  position: relative;
  text-align: center;
  justify-content: center;
  top: 9rem;
  left: 0;
  color: red;
`
