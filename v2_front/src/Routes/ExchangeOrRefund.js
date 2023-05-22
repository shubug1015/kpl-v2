import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usersApi } from 'api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sections = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  width: 90vw;
  height: 50px;
  margin-top: 30px;
  font-size: 14px;
`;

const ImageSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 15vw;
`;

const BrandSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 10vw;
`;

const NameSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 25vw;
`;

const OptionSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 5vw;
`;

const PriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const QtySectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 5vw;
`;

const PostPriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const TotalPriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  border: ${(props) => props.theme.mainBorder};
  width: 90vw;
  padding: 30px 0;
  margin-bottom: 20px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 150px;
  width: 15vw;
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
`;

const Qty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
`;

const PostPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
`;

const Alert = styled.div`
  border: ${(props) => props.theme.mainBorder};
  width: 90vw;
  height: 500px;
  margin-bottom: 30px;
`;

const Btns = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const ExchangeBtn = styled.div`
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  background-color: #dbdbdb;
  width: 80px;
  height: 30px;
  margin-right: 30px;
  cursor: pointer;
`;

const RefundBtn = styled.div`
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  background-color: #dbdbdb;
  width: 80px;
  height: 30px;
  cursor: pointer;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const ExchangeOrRefund = (props) => {
  const purchasedId = props.location.state.purchasedId;
  const id = props.location.state.id;
  const imageUrl = props.location.state.imageUrl;
  const name = props.location.state.name;
  const brand = props.location.state.brand;
  const option = props.location.state.option;
  const price = props.location.state.price;
  const qty = props.location.state.qty;

  const submitExchange = async (event) => {
    event.preventDefault();
    try {
      await usersApi.exchange(purchasedId);
    } catch {
      alert('Error');
    }
  };

  const submitRefund = async (event) => {
    event.preventDefault();
    try {
      await usersApi.refund(purchasedId);
    } catch {
      alert('Error');
    }
  };

  return (
    <Container>
      <Sections>
        <ImageSectionTitle>사진</ImageSectionTitle>
        <BrandSectionTitle>작가 / 브랜드</BrandSectionTitle>
        <NameSectionTitle>상품명</NameSectionTitle>
        <OptionSectionTitle>옵션</OptionSectionTitle>
        <PriceSectionTitle>판매가</PriceSectionTitle>
        <QtySectionTitle>수량</QtySectionTitle>
        <PostPriceSectionTitle>배송비</PostPriceSectionTitle>
        <TotalPriceSectionTitle>합계</TotalPriceSectionTitle>
      </Sections>
      <Item>
        <SLink to={`/products/${id}`}>
          <Image bgUrl={`${imageUrl}`} />
        </SLink>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <Option>{option}</Option>
        <Price>{price}</Price>
        <Qty>{qty}</Qty>
        <PostPrice>0</PostPrice>
        <TotalPrice>{price * qty}</TotalPrice>
      </Item>
      <Alert>* 교환/환불시 주의사항 *</Alert>
      <Btns>
        <ExchangeBtn onClick={submitExchange}>교환하기</ExchangeBtn>
        <RefundBtn onClick={submitRefund}>환불하기</RefundBtn>
      </Btns>
    </Container>
  );
};

export default ExchangeOrRefund;
