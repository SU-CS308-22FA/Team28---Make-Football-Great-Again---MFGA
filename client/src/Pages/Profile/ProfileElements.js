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
  
  height: 45rem;  
  width: 60rem;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.5);
  border-top-right-radius:5%;
  border-bottom-left-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius:5%;
  
  top: 10%;
  

  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */

  background: white;
  box-shadow: 0 4px 32px 0 rgba(50, 50, 100, 0.37);
`;

export const NameTitle = styled.h1`
  position: relative;
 
top: 14%;

  color: black;
  
  text-decoration-thickness: 1px;
  text-align: center;
  font-weight: bold;

  font-size: 2.5rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

export const UsernameTitle = styled.h1`
  position: relative;
  top: 16%;
  
  

  color: rgb(0, 0, 0, 0.5);

  text-align: center;

  font-size: 1.8rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
export const StyledButton = styled(Button)`
  position: absolute   ;
  top: 5%;
 right: 4%;

  border: none;
  justify-content: center;
  font-weight: bold;
  

  color: rgb(0, 0, 0, 0.8);

  background: linear-gradient(to right, #ff3838 0%, #ff4d4d 0%, #ffffff 2000%);
`;
export const StyledNavLink = styled(NavLink)`
  position: absolute;
  top: 5%;
  left: 4%;
  color: #ff3838;
  font-weight: bold;
  
`

export const TeamTitle = styled.h1`
  position: absolute;
  top: 5%;
  right: 7%;
  
  

  color: rgb(0, 0, 0, 0.5);

  text-align: center;
  color:black;
  font-weight:bold;
  font-size: 2rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;





export const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
  position: absolute;
  top: 12%;
  right: 5%;
`;

export const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 0.8rem;
  color: red;
  text-align: center;
  background: #ffffff;
`;

export const DropDownListContainer = styled("div")``;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: red;
  font-size: 0.8rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;