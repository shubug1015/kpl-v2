import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { usersApi } from "api";
// import Rating from "@material-ui/lab/Rating";
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

const QnAText = styled.textarea`
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

const SecretContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
const CheckBox = styled.input`
  margin-right: 10px;
  margin-left: 20px;
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

const PwBox = styled.input`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  padding-left: 10px;
  margin-left: 20px;
  width: 200px;
  height: 20px;
  font-size: 12px;
  outline: none;
`;

const QnA = (props) => {
  const brandName = props.location.state.brand;
  const itemName = props.location.state.item;
  const id = props.location.state.id;

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = "id";
    const QnATitle = "title";
    const QnAContent = "content";
    const secretContent = "secret";
    const secretPassword = "password";

    if (title.length < 1) {
      alert("제목을 입력해 주세요.");
    } else if (content.length < 1) {
      alert("내용을 입력해 주세요.");
    } else if (secret === true && pw.length < 1) {
      alert("비밀번호를 입력해 주세요.");
    } else if (secret === true && (pw.length < 4 || pw.length > 12)) {
      alert("비밀번호는 4 ~ 12자리로 입력해 주세요.");
    } else {
      const qna = {
        [product]: props.location.state.id,
        [QnATitle]: title,
        [QnAContent]: content,
        [secretContent]: secret,
        [secretPassword]: pw,
      };
      const productId = qna.id;
      try {
        await usersApi.addQnA(qna, productId);
        alert("제출 되었습니다.");
        history.push(`/products/${id}`);
      } catch {
        return;
      }
    }
  };

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

  const [secret, setSecret] = useState(false);
  const secretCheck = () => {
    setSecret(!secret);
    setPw("");
  };

  const [pw, setPw] = useState("");
  function handlePw(event) {
    const {
      target: { value },
    } = event;
    setPw(value);
  }
  console.log(secret, pw);
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
                <FormTitle>3. 제목</FormTitle>
                <TitleText
                  type="text"
                  placeholder="제목을 입력해 주세요."
                  onChange={updateTitle}
                />
              </EnterList>
              <EnterList>
                <FormTitle>4. 문의하기</FormTitle>
                <QnAText
                  type="text"
                  placeholder="문의하실 내용을 입력해 주세요."
                  onChange={updateText}
                />
              </EnterList>
              <EnterList>
                <FormTitle>비밀글 여부</FormTitle>
                <SecretContainer>
                  <CheckBox type="checkbox" onClick={secretCheck} /> 비밀글
                  설정하기
                  {secret === true ? (
                    <PwBox
                      onChange={handlePw}
                      type="password"
                      placeholder="비밀번호를 입력하세요.(4~ 12자리)"
                    />
                  ) : null}
                </SecretContainer>
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

export default QnA;
