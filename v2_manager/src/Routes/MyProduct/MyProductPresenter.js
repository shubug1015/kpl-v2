import React from 'react';
import styled from 'styled-components';
import Message from 'Components/Message';
import MyProductSection from 'Components/Sections/MyProductSection';
import SearchBar from 'Components/SearchBar';
import PageBar from 'Components/PageBar';
import Filter from 'Components/Filter';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;

const Section = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 90%;
`;

const MyProductPreseneter = ({
  manager,
  items,
  itemNum,
  error,
  redux_saveMyProducts,
}) => {
  return (
    <Container>
      <Title>{manager.name}님의 상품</Title>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <Content>
        <Sections>
          <Filter itemNum={itemNum} />
          <Section>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <MyProductSection
                  key={item.id}
                  id={item.id}
                  imageUrl={item.product_image}
                  detail_image={item.detail_image}
                  name={item.name}
                  brand={item.brand}
                  option={item.options}
                  price={item.price}
                  sold={item.sold}
                  view={item.view_num}
                  fav={item.fav_num}
                  qna={item.qna_num}
                  review={item.review_num}
                />
              ))}
          </Section>
          {items && items.length > 0 ? <PageBar itemNum={itemNum} /> : null}
        </Sections>
      </Content>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

export default MyProductPreseneter;
