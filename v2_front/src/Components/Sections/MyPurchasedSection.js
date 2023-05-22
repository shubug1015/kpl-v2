import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 23%;
  @media screen and (max-width: 768px) {
    width: 48%;
  }
  margin: 0 1%;
`;

const Item = styled.div`
  width: 100%;
  &:focus,
  &:hover {
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.3s linear;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  height: 200px;
  width: 100%;
`;

const BrandPrice = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  margin-top: 10px;
  background-color: #f8f9fb;
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const Divider = styled.div`
  padding-top: 1.3px;
  font-size: 12px;
  opacity: 0.8;
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  opacity: 0.8;
  padding: 0px 3px;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0px 5px;
`;

// const Option = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   width: 20%;
// `;

const Price = styled.div`
  width: 100%;
  padding-top: 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const Btns = styled.div`
  display: flex;
  width: 100%;
`;

const ReviewBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 100%;
  height: 24px;
  font-size: 13px;
`;

const ExchangeOrRefundBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: #dbdbdb;
  width: 100%;
  height: 24px;
  font-size: 13px;
`;

const SLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
    color: black;
    opacity: 0.8;
  }
  margin: 10px;
  width: 50%;
`;

const MyPurchasedSection = ({
  id,
  purchasedId,
  imageUrl,
  name,
  brand,
  option,
  price,
  qty,
  filter,
}) => {
  return (
    <Container>
      <SLink to={`/products/${id}`}>
        <Item>
          <Image bgUrl={`${imageUrl}`} />
          <BrandPrice>
            <Divider> | </Divider>
            <Brand>{brand}</Brand>
            <Divider> | </Divider>
            <Name>
              {name} ({option})
            </Name>
            {/* <Option>({option})</Option> */}
          </BrandPrice>
          <Price>{price}원</Price>
        </Item>
      </SLink>
      {filter === 'purchased' || filter === undefined ? (
        <Btns>
          <SLink
            to={{
              pathname: '/review',
              state: {
                id: id,
                purchasedId: purchasedId,
                brand: brand,
                item: name,
              },
            }}
          >
            <ReviewBtn>구매평 작성</ReviewBtn>
          </SLink>
          <SLink
            to={{
              pathname: '/exchange_refund',
              state: {
                id: id,
                purchasedId: purchasedId,
                imageUrl: imageUrl,
                name: name,
                brand: brand,
                option: option,
                price: price,
                qty: qty,
              },
            }}
          >
            <ExchangeOrRefundBtn>교환/환불하기</ExchangeOrRefundBtn>
          </SLink>
        </Btns>
      ) : null}
    </Container>
  );
};

MyPurchasedSection.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
};

export default MyPurchasedSection;
