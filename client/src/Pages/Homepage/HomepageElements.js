import { Sidebar } from "react-pro-sidebar";
import { Button, Card } from "reactstrap";
import styled from "styled-components";

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
  /* background: #eae7e7; */
  background-color: white;
  flex: 1;
`;

export const InnerContainer = styled.div`
  position: relative;
  padding-top: 10%;
  width: 100%;
  height: 90rem;
`;

export const StyledBackImage = styled.img`
  position: absolute;
  height: 100rem;
  width: 100rem;
`;

export const NewsContainer = styled.div`
  position: absolute;
  padding-top: 3rem;

  /* overflow-y: scroll;

  ::-webkit-scrollbar {display:none;} */

  border-style: groove;
  border-color: black;

  left: 25%;

  width: 50%;
  height: 95rem;
  top: 5rem;

  font-variant-caps: all-small-caps;

  text-align: -webkit-center;

  @media screen and (max-width: 795px) {
    width: 40%;
  }
`;

export const DeleteButton = styled(Button)`
  position: absolute;
  border-radius: 0;
  top: 5px;
  background: transparent;
  color: black;
  border-width: 0;
  width: 25px;
  height: 27px;
  right: 5px;

  &:hover {
    background-color: transparent;
    color: black;
  }
`;

export const CustomSidebar = styled.div`
  left: 82%;
  position: absolute;
  top: 5rem;
  height: 12.68%;
  width: 16rem;

  background-color: bottom;
`;

export const CustomImage = styled.img`
  position: absolute;
  width: 1261px;
  height: 550px;
  top: 4rem;
  left: 16rem;

  opacity: 0.8;
  @media screen and (max-width: 809px) {
    left: 0;
  }
`;

export const CustomHeaderTFFNews = styled.h3`
  text-align: -webkit-center;
  background-color: black;
  color: white;
  margin-top: 1rem;
`;

export const TFFButton = styled(Button)`
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
  border-width: 0px;
  width: 100%;

  --bs-btn-active-bg: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
  }
`;

export const CustomImageTFF = styled.img`
  margin-top: 10px;
  width: 70px;
  height: fit-content;
`;

export const CustomFeedImageTFF = styled.img`
    margin-top: 0;
    width: 25rem;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    position: absolute;
    left: 22rem;
`;

export const StyledContainerTFFInfo = styled.div`
    position: absolute;
    left: 51rem;
    width: 23rem;
    top: 16rem;
    font-size: 1.4rem;
`;

export const UpComingMatchContainer = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.7);

  top: -6rem;
  bottom: 0;

  display: inline-block;

  text-align: center;

  height: 100rem;
  width: 16rem;

  @media screen and (max-width: 809px) {
    display: none;
  }
`;

export const Fixture = styled.h4`
  position: relative;

  margin-bottom: 4rem;

  height: 1.5rem;
  width: 100%;
  top: 1.5rem;
  left: 0rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
`;

export const UpcomingMatch = styled(Card)`
  position: relative;

  left: 0.7rem;
  top: 0;

  height: 8rem;
  width: 85%;
  margin-top: 2rem;

  background: rgba(255, 255, 255, 0.9);

  &:hover {
    background: white;

    transition: 0.2s ease-in-out;
  }
`;

export const RecentMatchButton = styled(Button)`
  position: relative;
  left: 0;
  top: 5rem;
`;
