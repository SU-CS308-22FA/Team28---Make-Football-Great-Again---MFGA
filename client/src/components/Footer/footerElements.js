import styled from "styled-components";

export const Container = styled.div`
  padding: 15px 60px;
  margin-top: 10rem;
  position: relative;
  bottom: 0;
  width: 100%;
  background: #240b36;
  @media (max-width: 1000px) {
    padding: 15px 30px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 15px;
  text-decoration: none;
  &:hover {
      color: #c31432;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;

`;