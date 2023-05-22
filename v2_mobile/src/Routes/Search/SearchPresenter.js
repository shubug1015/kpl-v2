import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";
import Section from "Components/Section";
import { Helmet } from "react-helmet";
import PageBar from "Components/PageBar";
import Filter from "Components/Filter";

const Container = styled.div`
  padding-top: 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
  padding-left: 40px;
  padding-right: 40px;
`;

const ResultContainer = styled.div``;

const SearchPresenter = ({ searchResults, loading, error, itemNum }) => {
  return (
    <Container>
      <Filter itemNum={itemNum} />
      <ResultContainer>
        <Helmet>
          <title>DORUS | Search</title>
        </Helmet>
        <>
          {searchResults && searchResults.length > 0 && (
            <ItemContainer>
              {searchResults.map((item) => (
                <Section
                  key={item.id}
                  id={item.id}
                  imageUrl={item.product_image}
                  brand={item.brand}
                  name={item.name}
                />
              ))}
            </ItemContainer>
          )}
          <>
            {searchResults && searchResults.length !== 0 ? (
              <PageBar itemNum={itemNum} />
            ) : (
              <Message
                // text1={`"${searchTerm}" 에 대한 검색결과를 찾을 수 없어요 😥 `}
                text2="아래 추천 상품들은 어떠세요?"
                color="black"
              />
            )}
          </>
        </>
        }
      </ResultContainer>
    </Container>
  );
};

SearchPresenter.propTypes = {
  searchResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  // handleSubmit: PropTypes.func.isRequired,
  // updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
