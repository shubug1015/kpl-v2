import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { productsApi } from 'api';
import store from 'store';

const Container = styled.div`
  @media only screen and (max-width: 765px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
  }
  display: flex;
  width: 100%;
  height: 70px;
  font-size: 13px;
`;

const Section1 = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    height: 70%;
  }
  display: flex;
  width: 51.5%;
`;

const Section2 = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    height: 30%;
  }
  display: flex;
  width: 48.5%;
`;

const ReviewNum = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24.5%;
`;

const ReviewTitle = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    font-size: 16px;
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 75.5%;
`;

const ReviewName = styled.div`
  @media only screen and (max-width: 765px) {
    width: 30%;
    font-size: 12px;
    font-weight: 500;
    opacity: 0.7;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const ReviewDate = styled.div`
  @media only screen and (max-width: 765px) {
    width: 30%;
    font-size: 12px;
    font-weight: 500;
    opacity: 0.7;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const ReviewStar = styled.div`
  @media only screen and (max-width: 765px) {
    width: 30%;
    font-size: 12px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const ReviewDelete = styled.div`
  @media only screen and (max-width: 765px) {
    width: 10%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const ReviewDeleteBtn = styled.div`
  font-size: 10px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
`;

const ContentText = styled.div`
  line-height: 150%;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 95%;
  margin: 20px 0;
  padding: 30px 60px;
  font-size: 14px;
`;

const ReviewSection = ({
  ReviewId,
  ProductId,
  rating,
  title,
  content,
  name,
  date,
  num,
  user_pk,
  image,
}) => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    setOpenImage(false);
  };

  const userPk = store.getState()?.user.user_pk;
  const deleteReview = (event) => {
    event.preventDefault();
    productsApi.deleteReview(ReviewId, ProductId);
    alert('삭제되었습니다.');
    setView(false);
  };
  const handleImage = () => {
    setOpenImage(!openImage);
  };

  return (
    <>
      {view === true ? (
        <>
          <Container
            style={{ borderBottom: open ? 'none' : '1px solid #dbdbdb' }}
          >
            <Section1>
              <ReviewNum>{num} </ReviewNum>
              <ReviewTitle onClick={toggleOpen}>
                {title}
                <span style={{ position: 'absolute', left: '48%' }}>
                  {open === false ? <FaAngleDown /> : <FaAngleUp />}
                </span>
              </ReviewTitle>
            </Section1>
            <Section2>
              <ReviewName>{name}</ReviewName>
              <ReviewDate>{date.slice(0, 10)}</ReviewDate>
              <ReviewStar>
                <Rating
                  name='star-rating'
                  size='small'
                  value={rating / 2}
                  precision={0.5}
                  readOnly={true}
                />
              </ReviewStar>
              <ReviewDelete
                style={{
                  visibility: userPk === parseInt(user_pk) ? '' : 'hidden',
                }}
              >
                <ReviewDeleteBtn onClick={deleteReview}>삭제</ReviewDeleteBtn>
              </ReviewDelete>
            </Section2>
          </Container>
          {open === true ? (
            <ContentContainer>
              {image !== null ? (
                <Image
                  bgUrl={`${image}`}
                  onClick={handleImage}
                  style={{
                    width: openImage === true ? '700px' : '150px',
                    height: openImage === true ? '700px' : '150px',
                  }}
                />
              ) : null}
              <ContentText>{content}</ContentText>
            </ContentContainer>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default ReviewSection;
