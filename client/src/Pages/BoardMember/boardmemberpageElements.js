import styled from "styled-components";

export const ContainerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  margin: 0;
  padding: 0;

  height: 51rem;
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


export const InnerContainer = styled.div`
  position: relative;
  padding-top: 10%;
  width: 100%;
  height: 100%;
`