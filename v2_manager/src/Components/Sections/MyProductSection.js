import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';

const Container = styled.div`
  @media screen and (max-width: 768px) {
    width: 48%;
  }
  width: 31%;
  margin: 30px 1%;
`;

const Item = styled.div`
  width: 100%;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 260px;
`;

const BrandName = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
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

const Divider = styled.div`
  line-height: 15px;
  height: 15px;
  padding-top: 1.3px;
  font-size: 12px;
  opacity: 0.8;
`;

const Price = styled.div`
  width: 100%;
  padding-top: 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 80%;
  padding: 3% 0;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 100%;
  padding-left: 5%;
`;

const Section = styled.div`
  width: 100%;
  margin: 7px;
  font-size: 14px;
  opacity: 0.8;
`;

const ModifyConainer = styled.div``;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 2px;
  width: 20%;
  height: 25px;
  font-size: 13px;
  margin-bottom: 20px;
  /* background-color: #eae7d9; */
  &:hover {
    color: #adadad;
    text-decoration: none;
  }
`;

const MyProductSection = ({
  id,
  imageUrl,
  detail_image,
  name,
  brand,
  option,
  price,
  sold,
  view,
  fav,
  qna,
  review,
}) => {
  var data = {
    id: { id },
    imageUrl: { imageUrl },
    detail_image: { detail_image },
    name: { name },
    brand: { brand },
    price: { price },
    option: { option },
  };
  return (
    <Container>
      <Item>
        <SLink to={{ pathname: '/modify', state: data }}>
          <ModifyConainer>수정</ModifyConainer>
        </SLink>
        <Image bgUrl={`${imageUrl}`} />
        <BrandName>
          <Divider> | </Divider>
          <Brand>{brand}</Brand>
          <Divider> | </Divider>
          <Name>{name}</Name>
        </BrandName>
        <Price>{price}원</Price>
        <BottomContainer>
          <Detail>
            <Sections>
              <Section>
                <BsDot />
                판매: {sold}개
              </Section>
              <Section>
                <BsDot />
                조회: {view}회
              </Section>
              <Section>
                <BsDot />
                좋아요: {fav}개
              </Section>
              <Section>
                <BsDot />
                문의사항: {qna}개
              </Section>
              <Section>
                <BsDot />
                리뷰: {review}개
              </Section>
            </Sections>
          </Detail>
        </BottomContainer>
      </Item>
    </Container>
  );
};

MyProductSection.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  option: PropTypes.array,
  price: PropTypes.number,
  view: PropTypes.number,
  fav: PropTypes.number,
  qna: PropTypes.number,
  review: PropTypes.number,
};

export default MyProductSection;
