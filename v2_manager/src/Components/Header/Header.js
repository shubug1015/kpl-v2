import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.headerColor};
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled(Link)`
  letter-spacing: 0.5px;
  font-size: 55px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  &:hover {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;

// const SLink = styled(Link)`
//   &:hover {
//     color: #adadad;
//     text-decoration: none;
//   }
// `;

const Header = () => {
  return (
    <HeaderContainer>
      <Content>
        <Title to='/'>DORUS Seller</Title>
      </Content>
    </HeaderContainer>
  );
};

export default Header;
