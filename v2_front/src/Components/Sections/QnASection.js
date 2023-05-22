import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLock } from 'react-icons/fa';
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
  width: 50%;
`;

const Section2 = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    height: 30%;
  }
  display: flex;
  width: 50%;
`;

const QnALock = styled.div`
  @media only screen and (max-width: 765px) {
    width: 10%;
    font-size: 14px;
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const QnANum = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;

const QnATitle = styled.div`
  @media only screen and (max-width: 765px) {
    width: 90%;
    font-size: 16px;
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 90%;
`;

const QnAName = styled.div`
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

const QnADate = styled.div`
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

const QnAReply = styled.div`
  @media only screen and (max-width: 765px) {
    width: 30%;
    font-size: 12px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 13px;
`;

const QnADelete = styled.div`
  @media only screen and (max-width: 765px) {
    width: 10%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
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
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const QnAText = styled.div`
  line-height: 150%;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 95%;
  margin: 20px 0;
  padding: 30px 60px;
  font-size: 14px;
`;

const ReplyText = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-weight: 750;
  line-height: 150%;
  width: 100%;
  padding: 30px 60px;
  background-color: #f3f3f3;
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
  image,
  replied,
  qna_reply,
}) => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    setOpenImage(false);
  };

  const userPk = store.getState()?.user.user_pk;
  const deleteQnA = (event) => {
    event.preventDefault();
    productsApi.deleteQnA(QnAId, ProductId);
    alert('삭제되었습니다.');
    setView(false);
  };
  const [pw, setPw] = useState('');
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
      alert('비밀번호가 일치하지 않습니다.');
    }
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
              <QnALock>
                {secretCheck === true ? (
                  <FaLock style={{ fontSize: '12px' }} />
                ) : (
                  ''
                )}
              </QnALock>
              <QnANum>{num}</QnANum>
              <QnATitle onClick={toggleOpen}>
                {title}
                <span style={{ position: 'absolute', left: '48%' }}>
                  {open === false ? <FaAngleDown /> : <FaAngleUp />}
                </span>
              </QnATitle>
            </Section1>
            <Section2>
              <QnAName>{name}</QnAName>
              <QnADate>{date.slice(0, 10)}</QnADate>
              <QnAReply
                style={{ color: replied === true ? '#28A745' : '#DC3545' }}
              >
                {replied === true ? '답변 완료' : '답변 대기 중'}
              </QnAReply>
              <QnADelete
                style={{
                  visibility: userPk === parseInt(user_pk) ? '' : 'hidden',
                }}
              >
                <QnADeleteBtn onClick={deleteQnA}>삭제</QnADeleteBtn>
              </QnADelete>
            </Section2>
          </Container>
          {open === true ? (
            <ContentContainer>
              {secretCheck === true ? (
                <QnAText>
                  <PwInput
                    onChange={handlePw}
                    type='password'
                    placeholder='비밀번호를 입력하세요.'
                  />
                  <PwCheckBtn type='button' value='확인' onClick={pwCheck} />
                </QnAText>
              ) : (
                <>
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
                  <QnAText>{content}</QnAText>
                  {qna_reply.content !== undefined ? (
                    <ReplyText>{qna_reply.content}</ReplyText>
                  ) : (
                    ''
                  )}
                </>
              )}
            </ContentContainer>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default QnASection;
