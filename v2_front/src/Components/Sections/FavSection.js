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

const BrandName = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const Divider = styled.div`
  line-height: 15px;
  height: 15px;
  padding-top: 1.3px;
  font-size: 12px;
  opacity: 0.8;
`;

const Brand = styled.div`
  line-height: 15px;
  height: 15px;
  margin: 0px 3px;
  font-size: 14px;
  opacity: 0.8;
`;

const Name = styled.div`
  line-height: 15px;
  height: 15px;
  margin-left: 12px;
  font-size: 15px;
`;

const Price = styled.div`
  width: 100%;
  padding-top: 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const SLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
    color: black;
    opacity: 0.8;
  }
  margin: 10px;
`;

const FavSection = ({ id, imageUrl, name, brand, price }) => {
  return (
    <Container>
      <SLink to={`/products/${id}`}>
        <Item>
          <Image bgUrl={`${imageUrl}`} />
          <BrandName>
            <Divider> | </Divider>
            <Brand>{brand}</Brand>
            <Divider> | </Divider>
            <Name>{name}</Name>
          </BrandName>
          <Price>{price}원</Price>
        </Item>
      </SLink>
    </Container>
  );
};

FavSection.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
};

export default FavSection;
