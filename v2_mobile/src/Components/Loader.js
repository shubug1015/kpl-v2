import React from "react";
import styled from "styled-components";
import { Spinner } from "reactstrap";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 100px;
  margin-top: 300px;
`;

export default () => (
  <Container>
    <Spinner type="grow" color="secondary" />
    <Spinner type="grow" color="secondary" />
    <Spinner type="grow" color="secondary" />
  </Container>
);
