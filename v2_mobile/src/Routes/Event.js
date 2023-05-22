import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 50px 0px;
`;

const Content = styled.div`
  width: 80vw;
  padding-bottom: 50px;
`;

const Title = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  padding-left: 10px;
  padding-bottom: 20px;
  font-size: 25px;
`;

const Item = styled.div``;

const Event = () => {
  return (
    <Container>
      <Content>
        <Title>Event</Title>
        <Item></Item>
      </Content>
    </Container>
  );
};

export default Event;
