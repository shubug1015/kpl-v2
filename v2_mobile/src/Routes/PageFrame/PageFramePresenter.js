import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Section from "Components/Section";
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

const SectionTitle = styled.div`
  font-weight: 900;
  margin-left: 80px;
`;

const PaginationContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageFramePresenter = ({ items, itemNum, error, loading, section }) => {
  return (
    <>
      <Helmet>
        <title>Dorus </title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <SectionTitle>{section}</SectionTitle>
          <Filter itemNum={itemNum} />
          {items && items.length > 0 && (
            <ItemContainer>
              {items.map((item) => (
                <Section
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  imageUrl={item.product_image}
                />
              ))}
            </ItemContainer>
          )}
          <PaginationContainer>
            <PageBar itemNum={itemNum} />
          </PaginationContainer>
          {error && <Message color="e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};

PageFramePresenter.propTypes = {
  // id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default PageFramePresenter;
