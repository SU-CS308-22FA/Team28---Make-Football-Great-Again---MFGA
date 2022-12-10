import styled from "styled-components";
import {Card,Button} from "reactstrap";

export const ContainerCard = styled(Card)`
  display: inline-block;
  
  height: 6rem;
  width: 20rem;
  border-width: 3px;
  border-color: black;
  top: 6.5rem;
  justify-content: center;
  margin: 15px 20px 15px 20px; /* Added */
  float: none; /* Added */


  background: #DD5353;
  
`;

export const NameTitle = styled.h1`
  position: relative;
  display:table;
  top: 5%;
  color: black;
  margin: 0 auto 0 auto;
  
  text-decoration-thickness: 1px;
  text-alignment: center;
  font-weight: bold;

  font-size: 1.2rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
export const Rating = styled.h1`
  position: relative;
  display:table;
  top: 8%;
  color: white;
  margin: 0 auto 0 auto;
  
  text-decoration-thickness: 1px;
  text-alignment: center;
  font-weight: bold;

  font-size: 1rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
export const GoButton = styled(Button)`
  position: relative;
  display:table;
  top: 20%;
  margin: 0 auto 0 auto;
  width: 7rem;
  height: 1.8rem;

  border: none;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;

  color: white;

  background: black;
`;

