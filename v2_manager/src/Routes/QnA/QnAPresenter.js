import React from 'react';
import styled from 'styled-components';
import Message from 'Components/Message';
import QnASection from 'Components/Sections/QnASection';
import PageBar from 'Components/PageBar';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Sections = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.boldMainBorder};
  width: 80%;
  height: 50px;
  font-size: 16px;
  font-weight: 500;
`;

const Product = styled.div`
  text-align: center;
  width: 25%;
`;

const ProductTitle = styled.div`
  text-align: center;
  width: 30%;
`;

const Created = styled.div`
  text-align: center;
  width: 21.6%;
`;

const User = styled.div`
  text-align: center;
  width: 16%;
`;

const QnASectionItem = styled.div`
  width: 80%;
`;

const QnAPreseneter = ({ manager, items, itemNum, removeQnA, error }) => {
  return (
    <Container>
      <Title>{manager.name}님의 문의사항</Title>
      <Content>
        <Sections>
          <Product>상품명</Product>
          <ProductTitle>제목</ProductTitle>
          <Created>작성일</Created>
          <User>작성자</User>
        </Sections>
        {items && items.length > 0 && (
          <QnASectionItem>
            {items.map((item, index) => (
              <QnASection
                key={item.id}
                id={item.id}
                product={item.product}
                title={item.title}
                content={item.content}
                created={item.created}
                user={item.user}
                removeQnA={removeQnA}
              />
            ))}
          </QnASectionItem>
        )}
        {items && items.length > 0 ? <PageBar itemNum={itemNum} /> : null}
      </Content>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

export default QnAPreseneter;
