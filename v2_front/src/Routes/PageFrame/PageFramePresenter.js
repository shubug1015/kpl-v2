import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Message from 'Components/Message';
import PageFrameSection from 'Components/Sections/PageFrameSection';
import PageBar from 'Components/PageBar';
import Filter from 'Components/Filter';

const Container = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 90vw;
  margin: 40px 5vw;
`;

const PaginationContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageFramePresenter = ({ items, itemNum, error }) => {
  return (
    <>
      <Helmet>
        <title>Dorus </title>
      </Helmet>
      <Container>
        {/* <SectionTitle>{section}</SectionTitle> */}
        <Filter itemNum={itemNum} />
        {items && items.length > 0 && (
          <ItemContainer>
            {items.map((item) => (
              <PageFrameSection
                key={item.id}
                id={item.id}
                name={item.name}
                brand={item.brand}
                price={item.price}
                imageUrl={item.product_image}
              />
            ))}
          </ItemContainer>
        )}
        <PaginationContainer>
          <PageBar itemNum={itemNum} />
        </PaginationContainer>
        {error && <Message color='e74c3c' text={error} />}
      </Container>
    </>
  );
};

PageFramePresenter.propTypes = {
  items: PropTypes.array,
  itemNum: PropTypes.number,
  error: PropTypes.string,
};

export default PageFramePresenter;
