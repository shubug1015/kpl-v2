import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 100px;
`;

export default () => (
  <Container>
    <Spinner color='dark' />
  </Container>
);
