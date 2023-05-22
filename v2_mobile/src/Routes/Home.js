import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import HomePhotos from "Components/HomePhotos/HomePhotos";

const Container = styled.div``;

const HomePhotosContainer = styled.div`
  /* width: 80vw; */
`;

const BestContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const BestMenu = styled.ul`
  height: 500px;
  font-size: 20px;
`;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dorus | 세상을 아름답게</title>
      </Helmet>
      <Container>
        <HomePhotosContainer>
          <HomePhotos />
        </HomePhotosContainer>
        <BestContainer>
          <BestMenu>Best Items</BestMenu>
          <BestMenu>Recommended Items</BestMenu>
          <BestMenu>New Arrival</BestMenu>
        </BestContainer>
      </Container>
    </>
  );
};

export default Home;
