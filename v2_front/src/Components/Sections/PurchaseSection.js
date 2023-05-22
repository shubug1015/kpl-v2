import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Items = styled.div`
  display: flex;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
`;

const Images = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 150px;
  width: 15vw;
`;

const Brands = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
`;

const Names = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
`;

const Prices = styled.div`
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

const PostPrices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
`;

const TotalPrices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const PurchaseSection = ({ id, imageUrl, brand, name, option, price, qty }) => {
  return (
    <Items>
      <SLink to={`/products/${id}`}>
        <Images bgUrl={`${imageUrl}`} />
      </SLink>
      <Brands>{brand}</Brands>
      <Names>{name}</Names>
      <Options>{option}</Options>
      <Prices>{price}</Prices>
      <Qty>{qty}</Qty>
      <PostPrices>0</PostPrices>
      <TotalPrices>{price * qty}</TotalPrices>
    </Items>
  );
};

export default PurchaseSection;
