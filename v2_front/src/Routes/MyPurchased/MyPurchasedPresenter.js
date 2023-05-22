import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MyPurchasedSection from 'Components/Sections/MyPurchasedSection';
import Message from 'Components/Message';
import PageBar from 'Components/PageBar';
import { IoIosCheckmark } from 'react-icons/io';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Title = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 100%;
  padding: 20px 20px;
  margin: 30px 0px;
  font-size: 25px;
`;

const ItemNumContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const ItemNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 15px;
  font-size: 12px;
  font-weight: 900;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 90vw;
  margin: 40px 5vw;
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;

const FilterBtn = styled.button`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  background-color: transparent;
  width: 120px;
  padding: 7px;
  font-size: 13px;
  :not(:last-child) {
    margin-right: 20px;
  }
  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`;

const MyPurchasedPresenter = ({
  purchased,
  itemNum,
  exchange,
  refund,
  error,
}) => {
  const [filter, setFilter] = useState('purchased');

  const getPurchased = () => {
    setFilter('purchased');
  };

  const getExchange = () => {
    setFilter('exchange');
  };

  const getRefund = () => {
    setFilter('refund');
  };

  var product = purchased;

  if (filter === 'purchased') {
    product = purchased;
  } else if (filter === 'exchange') {
    product = exchange;
  } else if (filter === 'refund') {
    product = refund;
  }

  return (
    <Container>
      <Content>
        <Title>
          {filter === 'purchased'
            ? '구매내역'
            : filter === 'exchange'
            ? '교환상품'
            : '환불상품'}
        </Title>
        <ItemNumContainer>
          <ItemNum>총 {itemNum}개</ItemNum>
        </ItemNumContainer>
        <Filter>
          <FilterBtn onClick={getPurchased}>
            <IoIosCheckmark
              style={{
                display: filter === 'purchased' ? '' : 'none',
                color: '#ff595c',
              }}
            />
            구매상품
          </FilterBtn>
          <FilterBtn onClick={getExchange}>
            <IoIosCheckmark
              style={{
                display: filter === 'exchange' ? '' : 'none',
                color: '#ff595c',
              }}
            />
            교환요청 상품
          </FilterBtn>
          <FilterBtn onClick={getRefund}>
            <IoIosCheckmark
              style={{
                display: filter === 'refund' ? '' : 'none',
                color: '#ff595c',
              }}
            />
            환불요청 상품
          </FilterBtn>
        </Filter>
        <ItemContainer>
          {product && product.length > 0 && (
            <>
              {product.map((item) => (
                <MyPurchasedSection
                  key={item.id}
                  id={item.product.id}
                  productId={item.product.id}
                  purchasedId={item.id}
                  imageUrl={item.product.product_image}
                  name={item.product.name}
                  brand={item.product.brand}
                  option={item.option}
                  price={item.product.price}
                  qty={item.qty}
                  filter={filter}
                />
              ))}
            </>
          )}
        </ItemContainer>
        {product && product.length > 0 ? <PageBar itemNum={itemNum} /> : null}
      </Content>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

MyPurchasedPresenter.propTypes = {
  like: PropTypes.array,
  error: PropTypes.string,
};

export default MyPurchasedPresenter;
