import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Message from 'Components/Message';
import MyProductSection from 'Components/Sections/MyProductSection';
import SearchBar from 'Components/SearchBar';
import { Helmet } from 'react-helmet';
import PageBar from 'Components/PageBar';
import Filter from 'Components/Filter';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const SearchContainer = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
`;

const MyProducts = styled.div`
  width: 150px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 100vw;
  padding-left: 40px;
  padding-right: 40px;
`;

const SLink = styled(Link)`
  &:hover {
    color: #adadad;
    text-decoration: none;
  }
`;

const ResultContainer = styled.div``;

const SearchPresenter = ({ searchTerm, searchResults, itemNum, error }) => {
  return (
    <Container>
      <Helmet>
        <title>DORUS | Search</title>
      </Helmet>
      <Title>검색결과</Title>
      <Filter itemNum={itemNum} />
      <ResultContainer>
        <SearchContainer>
          <SLink to='/myproduct/?filter=new&page=1'>
            <MyProducts>내 상품 모두보기</MyProducts>
          </SLink>
          <SearchBar />
        </SearchContainer>
        {searchResults && searchResults.length > 0 && (
          <ItemContainer>
            {searchResults.map((item) => (
              <MyProductSection
                key={item.id}
                id={item.id}
                imageUrl={item.product_image}
                name={item.name}
                brand={item.brand}
                option={item.options}
                price={item.price}
                view={item.view_num}
                fav={item.fav_num}
                qna={item.qna_num}
                review={item.review_num}
              />
            ))}
          </ItemContainer>
        )}
        {searchResults && searchResults.length > 0 ? (
          <PageBar itemNum={itemNum} />
        ) : (
          <Message
            text1={`"${searchTerm}" 에 대한 검색결과를 찾을 수 없습니다.`}
            color='black'
          />
        )}
      </ResultContainer>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

SearchPresenter.propTypes = {
  searchResults: PropTypes.array,
  itemNum: PropTypes.number,
  error: PropTypes.string,
};

export default SearchPresenter;
