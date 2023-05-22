import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { logIn } from 'store';
import SearchBar from 'Components/SearchBar';
import 'Components/Header/Header.css';
import {
  RiUser3Line,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiFireLine,
  RiThumbUpLine,
  RiTimerFlashLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';

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
  /* justify-content: space-between; */
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  /* border-bottom: ${(props) => props.theme.mainBorder}; */
  width: 100vw;
  height: 50px;
`;

const UserContainer = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
  display: flex;
  width: 300px;
  margin-left: 5vw;
`;

const SmallUserIcon = styled.div`
  @media only screen and (min-width: 768px) {
    display: none;
  }
  height: 100%;
  margin-left: 3vw;
  cursor: pointer;
`;

const SmallUserContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #ffffff;
  width: 20vw;
  height: 200px;
  z-index: 3;
`;

const Divider = styled.div`
  font-size: 10px;
  padding: 5px;
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

const SmallLogOut = styled.div`
  font-size: 13px;
  opacity: 0.8;
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
  width: 70px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  &:hover,
  &:focus {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;
const SmallUser = styled.div`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  padding: 5px;
  &:hover,
  &:focus {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;

const HideHomeBtn = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
  font-size: 20px;
  font-weight: 900;
  margin-left: 25vw;
`;

const SmallHideHomeBtn = styled.div`
  @media only screen and (min-width: 768px) {
    display: none;
  }
  font-weight: 700;
  margin-left: 35vw;
`;

const MiddleContainer = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100vw;
  height: 130px;
`;

const Title = styled(Link)`
  @media only screen and (max-width: 768px) {
    width: 20%;
    text-align: center;
    font-size: 30px;
    font-weight: 900;
  }
  font-size: 50px;
  font-weight: 900;
  width: 20%;
  text-align: center;
  &:hover {
    opacity: 0.7;
    text-decoration: none;
    color: black;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
  display: flex;
  justify-content: center;
  width: 300px;
`;

const DropdownItemContainer = styled.div``;

const CategorySections = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const CategorySection = styled.div`
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
  width: 25%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const Sections = styled.div`
  @media only screen and (max-width: 768px) {
    justify-content: left;
    flex-wrap: wrap;
  }
`;

const Section = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 20px 1%;
  }
  display: flex;
  width: 100%;
  margin: 1% 1%;
`;

const BigCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  font-weight: 700;
  font-size: 16px;
  padding: 10px 0px;
  border-right: ${(props) => props.theme.mainBorder};
`;

const SmallCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  padding: 7px;
`;

const HeaderList = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 11px;
    width: 100px;
  }
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryContainer = styled.div`
  height: 50px;
  margin-left: 5vw;
`;

const Category = styled.div`
  width: 5vw;
  font-size: 14px;
  font-weight: 800;
  &:hover {
    opacity: 0.5;
  }
`;

const SLink = styled(Link)`
  &:hover {
    color: #adadad;
    text-decoration: none;
  }
`;

const Header = ({ logged, redux_removeLogInfo }) => {
  const [listTab, setListTab] = useState(false);
  const listToggle = () => setListTab(!listTab);
  const [userOpen, setUserOpen] = useState(false);
  const userToggle = () => setUserOpen(!userOpen);
  const [openCategory, setOpenCategory] = useState(false);
  const categoryToggle = () => setOpenCategory(!openCategory);

  const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = () => {
      setState({ y: window.scrollY, x: window.scrollX });
    };
    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    });
    return state;
  };

  const { y } = useScroll();

  const LOGIN_INFO = 'LogInInfo';

  const history = useHistory();

  const logOut = () => {
    setUserOpen(false);
    sessionStorage.removeItem(LOGIN_INFO);
    localStorage.removeItem(LOGIN_INFO);
    redux_removeLogInfo({ token: '', logged: false });
    history.push('/');
  };

  const category = {
    // 카테고리: [
    //   <SLink to='/'>
    //     <RiFireLine />
    //     인기 작품
    //   </SLink>,
    //   <SLink to='/'>
    //     <RiThumbUpLine />
    //     추천 작품
    //   </SLink>,
    //   <SLink to='/'>
    //     <RiTimerFlashLine />
    //     최신 작품
    //   </SLink>,
    //   <SLink to='/'>
    //     <RiMoneyDollarCircleLine />
    //     SALE!
    //   </SLink>,
    // ],
    Snack: [<SLink to='/snack/snacks/?filter=new&page=1'>수제 간식</SLink>],
  };

  return (
    <HeaderContainer>
      <TopContainer>
        {userOpen ? (
          <SmallUserContainer>
            {logged ? (
              <div>
                <SmallLogOut onClick={logOut}>로그아웃</SmallLogOut>
              </div>
            ) : (
              <SLink to='/login'>
                <SmallUser onClick={() => setUserOpen(false)}>로그인</SmallUser>
              </SLink>
            )}
            {logged ? (
              <SLink to='/basket'>
                <SmallUser onClick={() => setUserOpen(false)}>
                  장바구니
                </SmallUser>
              </SLink>
            ) : (
              <SLink to='/signup'>
                <SmallUser onClick={() => setUserOpen(false)}>
                  회원가입
                </SmallUser>
              </SLink>
            )}
            <SLink to='/mypage'>
              <SmallUser onClick={() => setUserOpen(false)}>
                마이페이지
              </SmallUser>
            </SLink>
            <SLink to='/like/?page=1'>
              <SmallUser onClick={() => setUserOpen(false)}>좋아요</SmallUser>
            </SLink>
          </SmallUserContainer>
        ) : null}
        <UserContainer>
          {logged ? (
            <div>
              <LogOut onClick={logOut}>로그아웃</LogOut>
            </div>
          ) : (
            <SLink to='/login'>
              <User>로그인</User>
            </SLink>
          )}
          <Divider> | </Divider>
          {logged ? (
            <SLink to='/basket'>
              <User>장바구니</User>
            </SLink>
          ) : (
            <SLink to='/signup'>
              <User>회원가입</User>
            </SLink>
          )}
          <Divider> | </Divider>
          <SLink to='/mypage'>
            <User>마이페이지</User>
          </SLink>
          <Divider> | </Divider>
          <SLink to='/like/?page=1'>
            <User>좋아요</User>
          </SLink>
        </UserContainer>
        <SmallUserIcon>
          {userOpen ? (
            <RiArrowUpSLine
              style={{ fontSize: '25px', height: '100%' }}
              onClick={userToggle}
            />
          ) : (
            <RiUser3Line
              style={{ fontSize: '25px', height: '100%' }}
              onClick={userToggle}
            />
          )}
        </SmallUserIcon>
        <SLink to='/'>
          <SmallHideHomeBtn className={y > 129.5 ? 'not_hide' : 'hide'}>
            DORUS
          </SmallHideHomeBtn>
          <HideHomeBtn className={y > 129.5 ? 'not_hide' : 'hide'}>
            DORUS
          </HideHomeBtn>
        </SLink>
      </TopContainer>
      <MiddleContainer>
        <Title to='/'>DORUS</Title>
        <SearchBar />
      </MiddleContainer>
      <BottomContainer className={y > 129.5 ? 'wrap' : 'unwrap'}>
        <CategoryContainer>
          <ButtonDropdown
            isOpen={listTab}
            // onMouseEnter={listToggle}
            // onMouseLeave={listToggle}
            toggle={listToggle}
            style={{ padding: 0, width: '12vw' }}
          >
            <DropdownToggle
              caret
              color='white'
              style={{
                width: '5vw',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: 'none',
                alignItems: 'center',
              }}
              onClick={categoryToggle}
            >
              <Category>
                Category{' '}
                {openCategory ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </Category>
            </DropdownToggle>
            <DropdownMenu
              style={{
                marginTop: '-0.5px',
                width: '50vw',
              }}
            >
              <DropdownItemContainer>
                <CategorySections>
                  <CategorySection>
                    <RiFireLine
                      style={{ fontSize: '40px', paddingBottom: '5px' }}
                    />
                    인기 작품
                  </CategorySection>
                  <CategorySection>
                    <RiThumbUpLine
                      style={{ fontSize: '40px', paddingBottom: '5px' }}
                    />
                    추천 작품
                  </CategorySection>
                  <CategorySection>
                    <RiTimerFlashLine
                      style={{ fontSize: '40px', paddingBottom: '5px' }}
                    />
                    최신 작품
                  </CategorySection>
                  <CategorySection>
                    <RiMoneyDollarCircleLine
                      style={{ fontSize: '40px', paddingBottom: '5px' }}
                    />
                    SALE!
                  </CategorySection>
                </CategorySections>
                <Sections>
                  {Object.keys(category).map((key, index) => (
                    <Section key={key}>
                      <BigCategory>{key}</BigCategory>
                      {category[key].map((item, index) => (
                        <SmallCategory
                          key={`${key}${index}`}
                          onClick={listToggle}
                        >
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
          {/* <HeaderList>인기작품</HeaderList>
          <HeaderList>추천작품</HeaderList>
          <HeaderList>최신작품</HeaderList>
          <HeaderList>SALE!</HeaderList>
          <Divider2> </Divider2> */}
          <SLink to='/about_dorus'>
            <HeaderList>About DORUS</HeaderList>
          </SLink>
          <SLink to='/donating'>
            <HeaderList>후원현황</HeaderList>
          </SLink>
        </Item>
      </BottomContainer>
    </HeaderContainer>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_removeLogInfo: (data) => dispatch(logIn(data)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
