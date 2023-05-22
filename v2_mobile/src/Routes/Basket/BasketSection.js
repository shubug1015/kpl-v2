import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Items = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 88vw;
  height: 100px;
  font-size: 13px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 127px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
`;

const Brands = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.1%;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25.3%;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.2%;
`;

const Prices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.1%;
`;

const Qty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.1%;
`;

const PostPrices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.1%;
`;

const TotalPrices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const BasketSection = ({ id,productId, imageUrl, brand, name, option, price, qty }) => {
  return (
    <Items id={id}>
      <SLink to={`/products/${productId}`}>
        <ImageContainer>
          <Image bgUrl={`${imageUrl}`} />
        </ImageContainer>
      </SLink>
      <Brands>{brand}</Brands>
      <Name>{name}</Name>
      <Options>{option}</Options>
      <Prices>{price}</Prices>
      <Qty>{qty}</Qty>
      <PostPrices>0</PostPrices>
      <TotalPrices>{price}</TotalPrices>
    </Items>
  );
};

export default BasketSection;
