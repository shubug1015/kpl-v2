import React, { useState } from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { usersApi } from "api";
import store from "store";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const ReviewNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;
const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  width: 40%;
`;
const ReviewName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;
const ReviewDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;
const ReviewStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const ReviewDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentText = styled.div`
  width: 90%;
  margin: 20px 0px;
  padding: 10px;
  border-radius: 5px;
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
}) => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const userPk = store.getState()?.user.user_pk;
  const deleteReview = (event) => {
    event.preventDefault();
    usersApi.deleteReview(ReviewId, ProductId);
    alert("삭제되었습니다.");
    setView(false);
  };

  return (
    <>
      {view === true ? (
        <Container>
          <ReviewNum>{num} </ReviewNum>
          <ReviewTitle onClick={toggleOpen}>
            {title}
            <span style={{ color: "gray" }}>
              {open === false ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </ReviewTitle>
          <ReviewName>{name}</ReviewName>
          <ReviewDate>{date.slice(0, 10)}</ReviewDate>
          <ReviewStar>
            <Rating
              name="star-rating"
              size="small"
              value={rating / 2}
              precision={0.5}
              readOnly={true}
            />
          </ReviewStar>
          <ReviewDelete
            style={{ visibility: userPk === parseInt(user_pk) ? "" : "hidden" }}
          >
            <ReviewDeleteBtn onClick={deleteReview}>삭제하기</ReviewDeleteBtn>
          </ReviewDelete>
        </Container>
      ) : null}
      {open === true ? (
        <ContentContainer>
          <ContentText>{content}</ContentText>
        </ContentContainer>
      ) : null}
    </>
  );
};

export default ReviewSection;
