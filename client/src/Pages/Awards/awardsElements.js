import { Button, Container } from "reactstrap";
import styled from "styled-components";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
  } from "react-pro-sidebar";
export const PRGlobalContainer = styled.div`
  position: relative;
`

export const PRContainer = styled( Container )`
  position: absolute;
  padding-top: 4rem;
  width: 70%;
  height: 40rem;
  right: -12rem;
  top: 0;
  overflow: scroll;
  border-width: 2px;
  border-color: black;
  @media screen and (max-width: 795px) {
        width: 40%;
  }
`
export const CustomSidebar = styled( Sidebar )`
  height: 48rem;
  background-color: #E8E8E8;
`
export const PointsTitle = styled.h4`
  position: absolute;
  padding-top: 4rem;
  width: 70%;
  height: 40rem;
  left: 75%;
  top: 0;

  @media screen and (max-width: 795px) {
        width: 40%;
  }
`

export const AwardButton = styled(Button)`
  position: absolute;
  top: 8rem;
  display: flex;
  width: 10rem;
  height: 35px;
  left: 75%;

  border: none;
  justify-content: center;

  color: #FCFBEB;

  background: #EC2A2A;
`;

export const UnapplyAwardButton = styled(Button)`
  position: absolute;
  top: 8rem;
  display: flex;
  width: 10rem;
  height: 35px;
  left: 75%;

  border: none;
  justify-content: center;

  color: #FCFBEB;

  background: #3E6D9C;
`;

export const FinishButton = styled(Button)`
  position: absolute;
  top: 4rem;
  display: flex;
  width: 10rem;
  height: 35px;
  left: 80%;

  border: none;
  justify-content: center;

  color: #FCFBEB;

  background: #EC2A2A;
`;