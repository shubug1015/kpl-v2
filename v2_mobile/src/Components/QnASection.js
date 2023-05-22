import React, { useState } from "react";
import styled from "styled-components";
import { FaLock } from "react-icons/fa";
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
const QnALock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;
const QnANum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;
const QnATitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  width: 40%;
`;
const QnAName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;
const QnADate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;
const QnAReply = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const QnADelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;

const QnADeleteBtn = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 20px 0px;
  border-radius: 5px;
  padding: 10px;
`;

const PwInput = styled.input`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  padding-left: 10px;
  width: 250px;
  height: 40px;
  outline: none;
`;

const PwCheckBtn = styled.input`
  width: 40px;
  height: 25px;
  margin-left: 10px;
  background-color: skyblue;
  border: ${(props) => props.theme.mainBorder};
  font-size: 10px;
  font-weight: 700;
`;

const QnASection = ({
  QnAId,
  ProductId,
  title,
  content,
  name,
  date,
  num,
  secret,
  password,
  user_pk,
}) => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const userPk = store.getState()?.user.user_pk;
  const deleteQnA = (event) => {
    event.preventDefault();
    usersApi.deleteQnA(QnAId, ProductId);
    alert("삭제되었습니다.");
    setView(false);
  };
  const [pw, setPw] = useState("");
  const [secretCheck, setSecretCheck] = useState(secret);
  function handlePw(event) {
    const {
      target: { value },
    } = event;
    setPw(value);
  }

  const pwCheck = () => {
    if (password === pw) {
      setSecretCheck(false);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <>
      {view === true ? (
        <Container>
          <QnALock>
            {secretCheck === true ? (
              <FaLock style={{ fontSize: "12px" }} />
            ) : (
              ""
            )}
          </QnALock>
          <QnANum>{num}</QnANum>
          <QnATitle onClick={toggleOpen}>
            {title}
            <span style={{ color: "gray" }}>
              {open === false ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </QnATitle>
          <QnAName>{name}</QnAName>
          <QnADate>{date.slice(0, 10)}</QnADate>
          <QnAReply>X</QnAReply>
          <QnADelete
            style={{ visibility: userPk === parseInt(user_pk) ? "" : "hidden" }}
          >
            <QnADeleteBtn onClick={deleteQnA}>삭제하기</QnADeleteBtn>
          </QnADelete>
        </Container>
      ) : null}
      {open === true ? (
        <ContentContainer>
          {secretCheck === true ? (
            <ContentText>
              <PwInput
                onChange={handlePw}
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
              <PwCheckBtn type="button" value="확인" onClick={pwCheck} />
            </ContentText>
          ) : (
            <ContentText>{content}</ContentText>
          )}
        </ContentContainer>
      ) : null}
    </>
  );
};

export default QnASection;
