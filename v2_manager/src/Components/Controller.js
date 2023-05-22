import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { managersApi } from 'api';
import store, { logIn } from 'store';
import SearchBar from 'Components/SearchBar';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  border-left: none;
  background-color: #ffffff;
  width: ${(props) => props.theme.controllerWidth};
  height: 100%;
  z-index: 2;
`;

const SmallContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 50px;
  height: 10%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 20px;
  margin-top: 15px;
  padding-left: 30px;
`;

const LogOut = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  width: 200px;
  padding: 20px 0;
  font-size: 40px;
  font-weight: 700;
`;

const Name = styled.div`
  text-align: center;
  border-bottom: 1px solid black;
  width: 180px;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 15px 0;
  font-size: 28px;
  font-weight: 600;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const Item = styled.div`
  text-align: center;
  line-height: 100px;
  /* border-bottom: ${(props) => props.theme.mainBorder}; */
  width: 120px;
  height: 70px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 300;
`;

const MainPage = styled.div`
  margin-top: 25px;
  font-size: 13px;
`;

const SLink = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.blackColor};
    text-decoration: none;
    opacity: 0.7;
  }
`;

const HomeController = ({ redux_removeLogInfo }) => {
  const [manager, setManager] = useState(null);
  const [open, setOpen] = useState(true);
  store.subscribe(() => {
    if (
      store.getState()?.location[store.getState()?.location.length - 1]
        .location === '/'
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  const openToggle = () => {
    setOpen(!open);
  };

  const LOGIN_INFO = 'LogInInfo';
  const history = useHistory();

  const logOut = async () => {
    sessionStorage.removeItem(LOGIN_INFO);
    localStorage.removeItem(LOGIN_INFO);
    await redux_removeLogInfo({ token: '', logged: false });
    history.push('/login');
  };

  const getData = async () => {
    const { data: manager } = await managersApi.manager();
    setManager(manager);
  };

  useEffect(() => {
    getData();
    return;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {open === true ? (
        <Container>
          <Content>
            <LogOutContainer>
              <LogOut onClick={logOut}>로그아웃</LogOut>
              <RiArrowLeftSLine
                style={{
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
                onClick={openToggle}
              />
            </LogOutContainer>
            <Title>DORUS</Title>
            <Name>Seller {manager?.name}</Name>
            <Search>
              <SearchBar />
            </Search>
            {/* <SLink to='/purchase/?page=1'>
              <Item>내 상품 주문내역</Item>
            </SLink>
            <SLink to='/register'>
              <Item>상품 등록하기</Item>
            </SLink>
            <SLink to='/myproduct/?filter=new&page=1'>
              <Item>내 상품 확인하기</Item>
            </SLink>
            <SLink to='/qna/?page=1'>
              <Item>문의사항 관리하기</Item>
            </SLink>
            <SLink to='/sold'>
              <Item>판매현황 확인하기</Item>
            </SLink> */}
            <Item>내 정보 수정</Item>
            <Item>판매중 상품 ?개</Item>
            <Item>수정 요청 상품 ?개</Item>
            <Item>내 브랜드관 관리</Item>
            <Item>공지사항</Item>
            <MainPage>DORUS 메인페이지 ></MainPage>
            <MainPage>DORUS 내 브랜드관 ></MainPage>
          </Content>
        </Container>
      ) : (
        <SmallContainer>
          <RiArrowRightSLine
            style={{ fontSize: '30px', marginTop: '10px', cursor: 'pointer' }}
            onClick={openToggle}
          />
        </SmallContainer>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_removeLogInfo: (data) => dispatch(logIn(data)),
  };
};

export default connect(null, mapDispatchToProps)(HomeController);
