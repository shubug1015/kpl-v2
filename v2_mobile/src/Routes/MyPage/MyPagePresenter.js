import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import FavSection from "Routes/Favorite/FavSection";
import { FaWonSign } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Content = styled.div`
  width: 90%;
`;

const Title = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  padding: 20px 20px;
  padding-top: 40px;
  font-size: 25px;
`;

const ProfileContainer = styled.div`
  display: flex;
  padding: 30px 10px;
`;

const Image = styled.div`
  width: 250px;
  height: 250px;
  border: ${(props) => props.theme.mainBorder};
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
`;

const InfoContainer = styled.div`
  width: 80vw;
  height: 250px;
  margin-left: 15px;
  margin-bottom: 30px;
  padding: 20px;
  border: ${(props) => props.theme.mainBorder};
`;

const MyInfoContainer = styled.div`
  padding: 0px 10px;
  padding-bottom: 15px;
`;

const MyInfo = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 30px;
`;

const MyName = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 23px;
  margin-right: 20px;
  display: flex;
`;

const EditProfileInfo = styled.div`
  background-color: ${(props) => props.theme.pinkColor};
  border-radius: 3px;
  padding: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const MyDetailContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const MyDetail = styled.div`
  margin-right: 100px;
`;

const MyDetailIcon = styled.div`
  text-align: center;
  font-size: 40px;
`;

const MyDetailTitle = styled.div`
  text-align: center;
  margin: 10px 0px;
  font-size: 12px;
`;

const MyDetailContent = styled.div`
  text-align: center;
  font-size: 18px;
`;

const FavProductContainer = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  padding: 10px;
`;

const FavProductTitle = styled.div`
  text-align: center;
  width: 125px;
  background: linear-gradient(#fafafa, #ffe7e7);
  margin-bottom: 15px;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  /* background-color: ${(props) => props.theme.pinkColor}; */
`;

const FavProducts = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  height: 400px;
  padding: 20px 10px;
`;

const FavSectionText = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

const BoughtProductContainer = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  padding: 10px;
`;

const BoughtProductTitle = styled.div`
  text-align: center;
  width: 110px;
  background: linear-gradient(#fafafa, #ffe7e7);
  margin-bottom: 15px;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const BoughtProducts = styled.div`
  border: ${(props) => props.theme.mainBorder};
  padding: 40px;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const MyPagePresenter = ({ user, basket, like, loading, error }) => {
  const likes = like.map((i) => i.product);
  console.log(like.length);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Content>
        <Title>마이페이지</Title>
        <ProfileContainer>
          <Image bgImage={require("Components/assets/dorus_1.jpg")} />
          <InfoContainer>
            <MyInfoContainer>
              <MyInfo>
                <MyName>{user.name}</MyName>
                <SLink to="/mypage/edit_profile">
                  <EditProfileInfo>정보수정</EditProfileInfo>
                </SLink>
              </MyInfo>
              <MyDetailContainer>
                <MyDetail>
                  <MyDetailIcon>
                    <FaWonSign />
                  </MyDetailIcon>
                  <SLink to="/">
                    <MyDetailTitle>적립금</MyDetailTitle>
                  </SLink>
                  <MyDetailContent>10,000원</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <MyDetailIcon>
                    <RiCoupon3Line />
                  </MyDetailIcon>
                  <SLink to="/">
                    <MyDetailTitle>쿠폰 ></MyDetailTitle>
                  </SLink>
                  <MyDetailContent>12개</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <MyDetailIcon>
                    <FiShoppingCart />
                  </MyDetailIcon>
                  <SLink to="/basket">
                    <MyDetailTitle>장바구니 ></MyDetailTitle>
                  </SLink>
                  <MyDetailContent>{basket.length}개</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <MyDetailIcon>
                    <AiOutlineLike />
                  </MyDetailIcon>
                  <SLink to="/like">
                    <MyDetailTitle>좋아요 ></MyDetailTitle>
                  </SLink>
                  <MyDetailContent>{likes.length}개</MyDetailContent>
                </MyDetail>
              </MyDetailContainer>
            </MyInfoContainer>
          </InfoContainer>
        </ProfileContainer>
        <FavProductContainer>
          <FavProductTitle>좋아요 누른 상품</FavProductTitle>
          <FavProducts>
            {like && like.length > 0 ? (
              <>
                {likes.map((item) => (
                  <FavSection
                    key={item.id}
                    id={item.id}
                    imageUrl={item.product_image}
                    name={item.name}
                    brand={item.brand}
                  />
                ))}
              </>
            ) : (
              <FavSectionText>담긴 상품이 없습니다.</FavSectionText>
            )}
          </FavProducts>
        </FavProductContainer>
        <BoughtProductContainer>
          <BoughtProductTitle>구매했던 상품</BoughtProductTitle>
          <BoughtProducts>여기에 Section 띄우기</BoughtProducts>
        </BoughtProductContainer>
        {error && <Message color="e74c3c" text={error} />}
      </Content>
    </Container>
  );
};

MyPagePresenter.propTypes = {
  user: PropTypes.object,
  like: PropTypes.array,
  imageUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default MyPagePresenter;
