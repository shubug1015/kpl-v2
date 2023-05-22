import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { usersApi } from "api";
// import StarRating from "Components/StarRating";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  border-radius: 4px;
  width: 80vw;
  margin-bottom: 30px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  font-size: 12px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => props.theme.boldPinkBorder};
  border-radius: 4px;
  width: 200px;
  padding: 10px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`;

const EnterBox = styled.div`
  display: flex;
  justify-content: center;
`;

const EnterBorder = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  border-radius: 5px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 900px;
`;

const EnterForm = styled.form``;

const EnterList = styled.div`
  display: flex;
  justify-content: left;
  background-color: ${(props) => props.theme.whiteColor};
  border: ${(props) => props.theme.pinkBorder};
  border-radius: 12px;
  padding: 30px;
  margin: 30px 70px;
  :nth-child(5) {
    margin-bottom: 50px;
  }
`;

const FormTitle = styled.div`
  width: 150px;
`;

// const FormContent = styled.input`
//   border: none;
//   border-bottom: ${(props) => props.theme.mainBorder};
//   padding-left: 5px;
//   font-size: 13px;
//   outline: none;
// `;

const ReviewText = styled.textarea`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 600px;
  height: 400px;
  padding-top: 5px;
  padding-left: 10px;
  font-size: 13px;
  overflow: auto;
  outline: none;
`;

const TitleText = styled.textarea`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 600px;
  height: 50px;
  padding-top: 5px;
  padding-left: 10px;
  font-size: 13px;
  overflow: auto;
  outline: none;
`;

const SubmitBox = styled.input`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.whiteColor};
  margin-bottom: 20px;
  width: 100px;
  height: 40px;
  outline: none;
`;

const FixedContent = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const Review = (props) => {
  const brandName = props.location.state.brand;
  const itemName = props.location.state.item;
  const id = props.location.state.id;

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = "id";
    const reviewRating = "rating";
    const reviewTitle = "title";
    const reviewContent = "content";

    if (star < 0.5) {
      alert("별점을 입력해 주세요.");
    } else if (title.length < 1) {
      alert("제목을 입력해 주세요.");
    } else if (content.length < 1) {
      alert("내용을 입력해 주세요.");
    } else {
      const review = {
        [product]: props.location.state.id,
        [reviewRating]: star * 2,
        [reviewTitle]: title,
        [reviewContent]: content,
      };
      const productId = review.id;
      try {
        await usersApi.addReview(review, productId);
        alert("제출 되었습니다.");
        history.push(`/products/${id}`);
      } catch {
        return;
      }
    }
  };

  const [star, setStar] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const updateTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  const updateText = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  return (
    <Container>
      <Content>
        <ContentBox>
          <Title>
            <Text>구매평 작성하기</Text>
          </Title>
        </ContentBox>
        <EnterBox>
          <EnterBorder>
            <EnterForm onSubmit={handleSubmit}>
              <EnterList>
                <FormTitle>1. 작가명/브랜드명</FormTitle>
                <FixedContent>{brandName}</FixedContent>
              </EnterList>
              <EnterList>
                <FormTitle>2. 제품명</FormTitle>
                <FixedContent>{itemName}</FixedContent>
              </EnterList>
              <EnterList>
                <FormTitle>3. 별점</FormTitle>
                <Rating
                  name="star-rating"
                  size="large"
                  value={star}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </EnterList>
              <EnterList>
                <FormTitle>4. 제목</FormTitle>
                <TitleText
                  type="text"
                  placeholder="제목을 입력해 주세요."
                  onChange={updateTitle}
                />
              </EnterList>
              <EnterList>
                <FormTitle>5. 구매평</FormTitle>
                <ReviewText
                  type="text"
                  placeholder="구매평을 입력해 주세요."
                  onChange={updateText}
                />
              </EnterList>
              <ContentBox>
                <SubmitBox type="submit" value="제출하기" />
              </ContentBox>
            </EnterForm>
          </EnterBorder>
        </EnterBox>
      </Content>
    </Container>
  );
};

export default Review;
