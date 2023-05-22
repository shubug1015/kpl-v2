import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  margin: 20px 0px;
  /* margin-right: 50px; */
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
  width: 250px;
  height: 300px;
`;

const Name = styled.div`
  width: 250px;
  font-size: 14px;
  margin-top: 10px;
  padding-bottom: 10px;
  opacity: 0.6;
  border-bottom: ${(props) => props.theme.mainBorder};
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

const MyPageSection = ({ id, imageUrl, name, brand, price }) => {
  return (
    <Container>
      <SLink to={`/products/${id}`}>
        <Item>
          <Image bgUrl={`${imageUrl}`} />
          <Name>{name}</Name>
          <Price>{brand}</Price>
        </Item>
      </SLink>
    </Container>
  );
};

MyPageSection.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
};

export default MyPageSection;
