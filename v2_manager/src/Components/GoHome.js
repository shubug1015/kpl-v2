import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHome2Line } from 'react-icons/ri';
import store from 'store';

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 30px;
  font-size: 20px;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const GoHome = () => {
  const [state, setState] = useState(true);

  store.subscribe(() => {
    if (
      store.getState()?.location[store.getState()?.location.length - 1]
        .location === '/'
    ) {
      setState(false);
    } else {
      setState(true);
    }
  });

  return (
    <Container>
      {state ? (
        <SLink to='/'>
          <RiHome2Line />
        </SLink>
      ) : null}
    </Container>
  );
};

export default GoHome;
