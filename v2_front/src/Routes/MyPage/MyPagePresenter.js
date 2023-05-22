import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Message from 'Components/Message';
import FavSection from 'Components/Sections/FavSection';
import MyPurchasedSection from 'Components/Sections/MyPurchasedSection';
import { FaWonSign, FaCheck } from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineLike } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Content = styled.div`
  width: 90vw;
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
  @media only screen and (max-width: 850px) {
    display: none;
  }
  border: ${(props) => props.theme.mainBorder};
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  width: 250px;
  height: 250px;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 80vw;
  margin-left: 15px;
  margin-bottom: 30px;
  padding: 20px;
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
  @media only screen and (max-width: 765px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  display: flex;
  justify-content: left;
`;

const MyDetail = styled.div`
  @media only screen and (max-width: 765px) {
    width: 48%;
    margin: 2% 1%;
  }
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
  width:90vw;
  margin-bottom: 50px;
`;

const FavProductTitle = styled.div`
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 120px;
  height: 30px;
  font-size: 13px;
  font-weight: 500;
`;

const FavProducts = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 90vw;
`;

const FavSectionText = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

const BoughtProductContainer = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  width:90vw;
  
`;

const BoughtProductTitle = styled.div`
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 120px;
  height: 30px;
  font-size: 13px;
  font-weight: 500;
`;

const BoughtProducts = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 90vw;
  margin-bottom: 50px;
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10px;
  margin-bottom: 7px;
`;

const ShowMoreText = styled.div`
  text-align: center;
  width: 80px;
  padding: 10px 0px;
  font-size: 12px;
  font-weight: 800;
  opacity: 0.8;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const MyPagePresenter = ({ user, basket, like, purchase, error }) => {
  const likes = like.map((i) => i.product);
  const preLikes = likes.slice(0, 4);
  const prePurchases = purchase.slice(0, 4);

  return (
    <Container>
      <Content>
        <Title>마이페이지</Title>
        <ProfileContainer>
          <Image bgImage={require('Components/assets/dorus_1.jpg')} />
          <InfoContainer>
            <MyInfoContainer>
              <MyInfo>
                <MyName>{user.name}</MyName>
                <SLink to='/mypage/edit_profile'>
                  <EditProfileInfo>정보수정</EditProfileInfo>
                </SLink>
              </MyInfo>
              <MyDetailContainer>
                <MyDetail>
                  <SLink to='/'>
                    <MyDetailIcon>
                      <FaWonSign />
                    </MyDetailIcon>
                    <MyDetailTitle>적립금</MyDetailTitle>
                  </SLink>
                  <MyDetailContent>10,000원</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <SLink to='/'>
                    <MyDetailIcon>
                      <RiCoupon3Line />
                    </MyDetailIcon>
                    <MyDetailTitle>쿠폰 </MyDetailTitle>
                  </SLink>
                  <MyDetailContent>12개</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <SLink to='/basket'>
                    <MyDetailIcon>
                      <FiShoppingCart />
                    </MyDetailIcon>
                    <MyDetailTitle>장바구니 </MyDetailTitle>
                  </SLink>
                  <MyDetailContent>{basket.length}개</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <SLink to='/like/?page=1'>
                    <MyDetailIcon>
                      <AiOutlineLike />
                    </MyDetailIcon>
                    <MyDetailTitle>좋아요 </MyDetailTitle>
                  </SLink>
                  <MyDetailContent>{likes.length}개</MyDetailContent>
                </MyDetail>
                <MyDetail>
                  <SLink to='/mypurchased/?page=1'>
                    <MyDetailIcon>
                      <FaCheck />
                    </MyDetailIcon>
                    <MyDetailTitle>구매내역 </MyDetailTitle>
                  </SLink>
                  <MyDetailContent>{purchase.length}개</MyDetailContent>
                </MyDetail>
              </MyDetailContainer>
            </MyInfoContainer>
          </InfoContainer>
        </ProfileContainer>
        <FavProductContainer>
          <FavProductTitle>좋아요 누른 상품</FavProductTitle>
          {likes.length > 0 ? (
            <ShowMore>
              <SLink to='/like/?page=1'>
                <ShowMoreText>모두보기 </ShowMoreText>
              </SLink>
            </ShowMore>
          ) : null}
          <FavProducts>
            {like && like.length > 0 ? (
              <>
                {preLikes.map((item) => (
                  <FavSection
                    key={item.id}
                    id={item.id}
                    imageUrl={item.product_image}
                    name={item.name}
                    brand={item.brand}
                    price={item.price}
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
          {purchase.length > 0 ? (
            <ShowMore>
              <SLink to='/mypurchased/?page=1'>
                <ShowMoreText>모두보기</ShowMoreText>
              </SLink>
            </ShowMore>
          ) : null}
          <BoughtProducts>
            {purchase && purchase.length > 0 ? (
              <>
                {prePurchases.map((item) => (
                  <MyPurchasedSection
                    key={item.id}
                    id={item.product.id}
                    purchasedId={item.id}
                    imageUrl={item.product.product_image}
                    brand={item.product.brand}
                    name={item.product.name}
                    option={item.option}
                    price={item.product.price}
                    qty={item.qty}
                  />
                ))}
              </>
            ) : (
              <FavSectionText>담긴 상품이 없습니다.</FavSectionText>
            )}
          </BoughtProducts>
        </BoughtProductContainer>
        {error && <Message color='e74c3c' text={error} />}
      </Content>
    </Container>
  );
};

MyPagePresenter.propTypes = {
  user: PropTypes.object.isRequired,
  basket: PropTypes.array,
  like: PropTypes.array,
  purchase: PropTypes.array,
  error: PropTypes.string,
};

export default MyPagePresenter;
