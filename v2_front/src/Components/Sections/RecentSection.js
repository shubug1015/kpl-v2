import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 300px;
// @media screen and (max-width: 768px) {
//   width: 48%;
// }
// /* margin: 0 1%; */
// `;

// const Item = styled.div`
//   /* width: 100%; */
//   &:focus,
//   &:hover {
//     text-decoration: none;
//     opacity: 0.7;
//     transition: opacity 0.3s linear;
//   }
// `;

// const Image = styled.div`
//   background-image: url(${(props) => props.bgUrl});
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-position: center center;
//   width: 100px;
//   height: 200px;
// `;

// const BrandPrice = styled.div`
//   display: flex;
//   width: 100%;
//   padding-bottom: 10px;
//   margin-top: 10px;
//   background-color: #f8f9fb;
//   border-bottom: ${(props) => props.theme.mainBorder};
// `;

// const Brand = styled.div`
//   font-size: 14px;
//   font-weight: 500;
//   opacity: 0.7;
//   margin: 0px 10px;
// `;

// const Name = styled.div`
//   font-size: 14px;
//   font-weight: 500;
// `;

// const Price = styled.div`
//   width: 100%;
//   font-size: 14px;
//   font-weight: 500;
//   opacity: 0.8;
//   padding: 10px;
// `;

// const SLink = styled(Link)`
//   &:hover,
//   &:focus {
//     text-decoration: none;
//     color: black;
//     opacity: 0.8;
//   }
//   margin: 10px;
// `;

const Container = styled.div`
  width: 23%;
  @media screen and (max-width: 768px) {
    width: 48%;
  }
  margin: 0 1%;
`;

const Item = styled.div`
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
  width: 200px;
  height: 200px;
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
  margin: 0px 3px;
  font-size: 14px;
  opacity: 0.8;
`;

const Name = styled.div`
  margin-left: 10px;
  font-size: 14px;
`;

const Price = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const SLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
    color: black;
    opacity: 0.8;
  }
`;

const RecentSection = ({ id, imageUrl, name, brand, price }) => {
  return (
    <Container>
      <SLink to={`/products/${id}`}>
        <Item>
          <Image bgUrl={`${imageUrl}`} />
          <BrandPrice>
            <Divider> | </Divider>
            <Brand>{brand}</Brand>
            <Divider> | </Divider>
            <Name>{name}</Name>
          </BrandPrice>
          <Price>{price}원</Price>
        </Item>
      </SLink>
    </Container>
  );
};

RecentSection.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
};

export default RecentSection;
