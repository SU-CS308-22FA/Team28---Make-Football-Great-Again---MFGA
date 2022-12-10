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

  height: 120%;
  width: 100%;

  

  
  background: gray;
  flex: 1;

  /* @media screen and (max-width: 768px) {
        display: none;
  } */
`;

export const ContainerCard = styled(Card)`
  position: relative;
  height: 43.75rem;
  width: 27rem;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.5);
  border-top-right-radius: 17%;
  border-bottom-left-radius: 20%;
  border-top-left-radius: 10%;
  top: 6.5rem;

  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 32px 0 rgba(50, 50, 100, 0.37);

  
`;

export const Title = styled.h1`
  position: relative;
  margin: auto;
  top: 65px;

  color: black;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-align: center;

  font-size: 2.18rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

export const DropDownContainer2 = styled("div")`
  width: 4.4em;
  
  position: absolute;
  right: 6%;
  top: 15%;
  margin: 0 auto;
`;

export const DropDownHeader2 = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #3faffa;
  background: #ffffff;
`;

export const DropDownListContainer2 = styled("div")``;

export const DropDownList2 = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 0.8rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem2 = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

export const FilterTitle = styled("h1")`
  position: absolute;
  right: 4%;
  top: 11%;
font-size: 1.3rem;
font-weight:bold;

`;