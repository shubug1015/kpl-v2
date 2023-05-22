import React from "react";
import styled from "styled-components";
import { Progress } from "reactstrap";

const Container = styled.div`
  width: 100vw;
`;
const Title = styled.div`
  padding: 40px;
  font-size: 25px;
  font-weight: 800;
  border-bottom: ${(props) => props.theme.mainBorder};
`;
const GaugeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 60px;
  border-bottom: ${(props) => props.theme.mainBorder};
  padding: 40px;
`;

const Gauge = styled.div`
  height: 18px;
  width: 40vw;
  display: flex;
  align-items: center;
  background-color: black;
`;

const Temperature = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
  color: #ff80b0;
`;

const DonationContainer = styled.div`
  padding: 40px;
`;

const Donating = () => (
  <>
    <Container>
      <Title>DORUS 후원 현황</Title>
      <GaugeContainer>
        <Gauge>
          <Progress bar color="danger" value="30"></Progress>
        </Gauge>
        <Temperature>30º</Temperature>
      </GaugeContainer>
      <DonationContainer>asdasdsa</DonationContainer>
    </Container>
  </>
);

export default Donating;
