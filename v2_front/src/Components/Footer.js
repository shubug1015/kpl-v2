import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io";

const FooterContainer = styled.footer`
  position: relative;
  display: flex;
  z-index: 1;
  background-color: ${(props) => props.theme.whiteColor};
  border-top: ${(props) => props.theme.borderTop};
  width: 100vw;
  height: 300px;
  bottom: 0;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  opacity: 0.7;
`;

const List = styled.div`
  font-size: 12px;
`;

const Divider = styled.span`
  margin: 0 7px;
  font-size: 12px;
`;

const Sns = styled.div`
  position: absolute;
  right: 2vw;
  /* width: 100px; */
  background-color: pink;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ListContainer>
        <List>
          <SLink to="/about_dorus">
            About DORUS
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/terms_of_use">
            이용약관
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/privacy_policy">
            개인정보 처리방침
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/notice">
            공지사항
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/question">
            자주 묻는 질문
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/event">
            이벤트
            <Divider>|</Divider>
          </SLink>
        </List>
        <List>
          <SLink to="/entering">입점문의</SLink>
        </List>
        <Sns>
          <IoLogoInstagram size="25" />
          <IoLogoFacebook size="25" />
        </Sns>
      </ListContainer>
    </FooterContainer>
  );
};

export default Footer;
