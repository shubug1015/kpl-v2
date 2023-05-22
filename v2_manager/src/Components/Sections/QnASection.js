import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { managersApi } from 'api';

const Container = styled.div``;

const Item = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 120px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  font-size: 15px;
  opacity: 0.8;
`;

const Section1 = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 70%;
  }
  display: flex;
  width: 55%;
`;
const Section2 = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 30%;
  }
  display: flex;
  width: 45%;
`;

const Product = styled.div`
  @media screen and (max-width: 768px) {
    width: 20%;
    font-size: 14px;
    font-weight: 500;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45.5%;
  height: 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.div`
  @media screen and (max-width: 768px) {
    width: 80%;
    font-size: 16px;
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54.5%;
  height: 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Created = styled.div`
  @media screen and (max-width: 768px) {
    width: 25%;
    opacity: 0.8;
    font-size: 12px;
    font-weight: 500;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
`;

const User = styled.div`
  @media screen and (max-width: 768px) {
    width: 25%;
    opacity: 0.8;
    font-size: 12px;
    font-weight: 500;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36%;
`;

const AnswerBtnContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16%;
  cursor: pointer;
`;

const AnswerBtn = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-weight: 500;
    width: 30%;
    height: 60%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pinkColor};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  overflow: auto;
`;

const Content = styled.div`
  text-align: left;
  border: 1px solid black;
  border-radius: 3px;
  width: 80%;
  height: 200px;
  margin: 20px 0px;
  padding: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  padding-bottom: 30px;
`;

const AnswerInput = styled.textarea`
  width: 80%;
  height: 200px;
  padding: 10px;
  font-size: 13px;
  outline: none;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 70px;
  height: 30px;
  margin-top: 20px;
`;

const QnASection = ({
  id,
  product,
  title,
  content,
  created,
  user,
  removeQnA,
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [answer, setAnswer] = useState(false);
  const toggleAnswer = () => setAnswer(!answer);

  const [answerContent, setAnswerContent] = useState('');

  const handleAnswer = (event) => {
    setAnswerContent(event.target.value);
  };

  // const [hide, setHide] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const QnAId = 'qna_pk';
    const QnAContent = 'content';
    const qnaAnswer = {
      [QnAId]: id,
      [QnAContent]: answerContent,
    };
    if (answerContent.length > 0) {
      try {
        await managersApi.qnaAnswer(qnaAnswer);
        alert('답변완료 되었습니다.');
        removeQnA();
        // setHide(true);
      } catch {
        alert('Error');
      }
    } else {
      alert('작성된 답변이 없습니다.');
    }
  };

  return (
    <Container
    //  style={{ display: hide ? 'none' : '' }}
    >
      <Item
        style={{
          borderBottom: open || answer ? '' : '1px solid #dbdbdb',
        }}
      >
        <Section1>
          <Product onClick={toggleOpen}>{product}</Product>
          <Title onClick={toggleOpen}>{title}</Title>
        </Section1>
        <Section2>
          <Created>{created.substring(0, 10)}</Created>
          <User>{user}</User>
          <AnswerBtnContainer>
            <AnswerBtn onClick={toggleAnswer}>답변하기</AnswerBtn>
          </AnswerBtnContainer>
        </Section2>
      </Item>
      {open ? (
        <ContentContainer>
          <Content>{content}</Content>
        </ContentContainer>
      ) : null}
      {answer ? (
        <AnswerContainer>
          <AnswerInput
            type='text'
            placeholder='답변하기'
            onChange={handleAnswer}
          />
          <SubmitBtn onClick={handleSubmit}>제출</SubmitBtn>
        </AnswerContainer>
      ) : null}
    </Container>
  );
};

QnASection.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  created: PropTypes.string,
  user: PropTypes.string,
};

export default QnASection;
