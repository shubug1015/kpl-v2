import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SearchBar from "Routes/Search/SearchBar";
import "Components/Header/Header.css";
import { FaBars } from "react-icons/fa";
import store from "store";
import { GiJumpingDog } from "react-icons/gi";

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  align-items: center;
  z-index: 1;
  background-color: ${(props) => props.theme.headerColor};
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 230px;
`;

const TopContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100vw;
  height: 50px;
`;

const UserContainer = styled.div`
  display: flex;
  width: 40vw;
  margin-left: 5vw;
`;

const Divider = styled.div`
  font-size: 1vw;
  padding: 0.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogOut = styled.div`
  width: 70px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 5px;
  &:hover,
  &:focus {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;

const User = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2vw;
  font-weight: 700;
  padding: 5px;
  &:hover,
  &:focus {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;

const HideHomeBtn = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const MiddleContainer = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100vw;
  height: 130px;
`;

const Title = styled(Link)`
  font-size: 50px;
  font-weight: 900;
  width: 20vw;
  text-align: center;
  &:hover {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
  @media only screen and (max-width: 768px) {
    width: 50vw;
    /* margin-left: 20.5vw; */
    text-align: center;
  }
`;

const BottomContainer = styled.div`
  /* position: absolute;
  top: 180px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  border: none;
  width: 100vw;
  height: 50px; */
`;

const Item = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-around;
  /* @media only screen and (max-width: 768px) {
    display: none;
  } */
  margin-right: 5vw;
`;

const DropdownItemContainer = styled.div``;

const Sections = styled.div`
  display: flex;
`;

const Section = styled.div`
  width: 120px;
  margin: 0 10px;
`;
const BigCategory = styled.div`
  text-align: center;
  width: 120px;
  font-weight: 700;
  font-size: 16px;
  padding: 10px;
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const SmallCategory = styled.div`
  text-align: center;
  width: 120px;
  font-weight: 500;
  font-size: 12px;
  padding: 7px;
`;

const HeaderList = styled.div`
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
  height: 40px;
  display: flex;
  align-items: center;
`;

const CategoryContainer = styled.div`
  width: 5vw;
  height: 50px;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const Category = styled.div`
  width: 5vw;
  &:hover {
    opacity: 0.5;
  }
`;

const Divider2 = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const SLink = styled(Link)`
  &:hover {
    color: #adadad;
    text-decoration: none;
  }
`;

const Header = () => {
  const [listTab, setListTab] = useState(false);
  const listToggle = () => setListTab(!listTab);

  const [, setLogged] = useState(false);

  const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = () => {
      setState({ y: window.scrollY, x: window.scrollX });
    };
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    });
    return state;
  };

  const { y } = useScroll();

  const LOGIN_INFO = "LogInInfo";

  const logOut = () => {
    sessionStorage.removeItem(LOGIN_INFO);
    localStorage.removeItem(LOGIN_INFO);
    window.location.href = "http://localhost:3000/";
  };

  var Logged = store.getState()?.user.logged;

  store.subscribe(() => {
    Logged = store.getState()?.user.logged;
    if (Logged === true) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

  const category = {
    Wear: [
      <SLink to="/wear/clothes/?filter=new&page=1">옷</SLink>,
      <SLink to="/wear/accesories/?filter=new&page=1">악세사리</SLink>,
    ],
    Outside: [
      <SLink to="/outside/harnesses/?filter=new&page=1">하네스</SLink>,
      <SLink to="/outside/leaders/?filter=new&page=1">목줄</SLink>,
      <SLink to="/outside/autoleaders/?filter=new&page=1">자동리드줄</SLink>,
      <SLink to="/outside/carriers/?filter=new&page=1">이동가방</SLink>,
      <SLink to="/outside/envelopes/?filter=new&page=1">배변봉투</SLink>,
    ],
    House: [
      <SLink to="/house/homes/?filter=new&page=1">집</SLink>,
      <SLink to="/house/cushion/?filter=new&page=1">방석</SLink>,
      <SLink to="/house/fences/?filter=new&page=1">울타리</SLink>,
    ],
    Life: [
      <SLink to="/life/stares/?filter=new&page=1">계단</SLink>,
      <SLink to="/life/toilets/?filter=new&page=1">배변용품</SLink>,
      <SLink to="/life/diapers/?filter=new&page=1">기저귀</SLink>,
      <SLink to="/life/bathes/?filter=new&page=1">목욕용품</SLink>,
      <SLink to="/life/brushes/?filter=new&page=1">브러쉬</SLink>,
      <SLink to="/life/dishes/?filter=new&page=1">그릇</SLink>,
      <SLink to="/life/waterpots/?filter=new&page=1">급수기</SLink>,
    ],
    Toy: [
      <SLink to="/toy/toys/?filter=new&page=1">장난감</SLink>,
      <SLink to="/toy/noseworks/?filter=new&page=1">노즈워크</SLink>,
      <SLink to="/toy/trainings/?filter=new&page=1">훈련용품</SLink>,
    ],
    Food: [
      <SLink to="/food/foods/?filter=new&page=1">사료</SLink>,
      <SLink to="/food/snacks/?filter=new&page=1">간식</SLink>,
    ],
    Health: [
      <SLink to="/health/healthfood/?filter=new&page=1">건강식품</SLink>,
      <SLink to="/health/dental/?filter=new&page=1">덴탈껌</SLink>,
      <SLink to="/health/supplements/?filter=new&page=1">영양제</SLink>,
    ],
  };

  return (
    <HeaderContainer>
      <TopContainer>
        <UserContainer>
          {Logged ? (
            <div>
              <LogOut onClick={logOut}>로그아웃</LogOut>
            </div>
          ) : (
            <SLink to="/login">
              <User>로그인</User>
            </SLink>
          )}
          <Divider> | </Divider>
          {Logged ? (
            <SLink to="/basket">
              <User>장바구니</User>
            </SLink>
          ) : (
            <SLink to="/signup">
              <User>회원가입</User>
            </SLink>
          )}
          <Divider> | </Divider>
          <SLink to="/mypage">
            <User>마이페이지</User>
          </SLink>
          <Divider> | </Divider>
          <SLink to="/like">
            <User>좋아요</User>
          </SLink>
        </UserContainer>
        <SLink to="/">
          <HideHomeBtn className={y > 129.5 ? "not_hide" : "hide"}>
            DORUS
          </HideHomeBtn>
        </SLink>
        <SearchBar />
      </TopContainer>
      <MiddleContainer>
        <GiJumpingDog size="70" />
        <Title to="/">DORUS</Title>
      </MiddleContainer>
      <BottomContainer className={y > 129.5 ? "wrap" : "unwrap"}>
        <CategoryContainer>
          <ButtonDropdown
            isOpen={listTab}
            onMouseEnter={listToggle}
            onMouseLeave={listToggle}
            toggle={() => {}}
            style={{ padding: 0, width: "12vw" }}
          >
            <DropdownToggle
              caret
              color="white"
              style={{
                width: "5vw",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                boxShadow: "none",
                alignItems: "center",
              }}
            >
              <Category>
                <FaBars />
              </Category>
            </DropdownToggle>
            <DropdownMenu style={{ marginTop: "-0.5px", marginLeft: "50px" }}>
              <DropdownItemContainer>
                <Sections>
                  {Object.keys(category).map((key, index) => (
                    <Section key={key}>
                      <BigCategory>{key}</BigCategory>
                      {category[key].map((item, index) => (
                        <SmallCategory key={`${key}${index}`}>
                          {item}
                        </SmallCategory>
                      ))}
                    </Section>
                  ))}
                </Sections>
              </DropdownItemContainer>
            </DropdownMenu>
          </ButtonDropdown>
        </CategoryContainer>
        <Item>
          <HeaderList>인기작품</HeaderList>
          <HeaderList>추천작품</HeaderList>
          <HeaderList>최신작품</HeaderList>
          <HeaderList>SALE!</HeaderList>
          <Divider2> </Divider2>
          <SLink to="/about_dorus">
            <HeaderList>About DORUS</HeaderList>
          </SLink>
          <SLink to="/donating">
            <HeaderList>후원현황</HeaderList>
          </SLink>
        </Item>
      </BottomContainer>
    </HeaderContainer>
  );
};

export default Header;
