import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';

const Container = styled.div`
  @media only screen and (max-width: 765px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  justify-content: left;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  width: 100%;
  padding: 30px 80px;
  margin-bottom: 30px;
`;

const Product = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    margin-bottom: 20px;
    margin-right: 0px;
  }
  margin-right: 50px;
`;

const Name = styled.div`
  line-height: 40px;
  border-bottom: ${(props) => props.theme.mainBorder};
  height: 40px;
  font-size: 16px;
`;

const Price = styled.div`
  line-height: 30px;
  height: 30px;
  font-size: 14px;
`;

const Image = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    height: 240px;
  }
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 240px;
  height: 240px;
`;

const Sections = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Section = styled.div`
  font-size: 15px;
  font-weight: 400;
  display: flex;
  flex-wrap: wrap;
  :not(:last-child) {
    margin-bottom: 27px;
  }
`;

const SectionTitle = styled.div``;
const SectionText = styled.div`
  margin-left: 5px;
`;

const PurchaseSection = ({
  purchasedId,
  imageUrl,
  name,
  price,
  option,
  qty,
  buyer,
  receiver,
  address,
  number,
  email,
  message,
}) => {
  return (
    <Container>
      <Product>
        <Image bgUrl={`${imageUrl}`} />
        <Name>상품명: {name}</Name>
        <Price>가격: {price}원</Price>
      </Product>

      <Sections>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>옵션 :</SectionTitle>
          <SectionText>{option}</SectionText>
        </Section>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>수량 :</SectionTitle>
          <SectionText>{qty}</SectionText>
        </Section>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>구매자 :</SectionTitle>
          <SectionText>{buyer}</SectionText>
        </Section>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>받는 사람 :</SectionTitle>
          <SectionText>{receiver}</SectionText>
        </Section>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>주소 :</SectionTitle>
          <SectionText>{address}</SectionText>
        </Section>
        <Section>
          <BsDot style={{ color: 'red' }} />
          <SectionTitle>휴대폰 번호 :</SectionTitle>
          <SectionText>{number}</SectionText>
        </Section>
        <Section>
          <BsDot />
          <SectionTitle>배송 메세지 :</SectionTitle>
          <SectionText>{message}</SectionText>
        </Section>
        <Section>
          <BsDot />
          <SectionTitle>이메일 :</SectionTitle>
          <SectionText>{email}</SectionText>
        </Section>
      </Sections>
    </Container>
  );
};

PurchaseSection.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  option: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  buyer: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string,
  message: PropTypes.string,
};

export default PurchaseSection;
