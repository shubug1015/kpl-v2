import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import Message from 'Components/Message';
import PurchaseSection from 'Components/Sections/PurchaseSection';
import PageBar from 'Components/PageBar';
import { IoIosCheckmark } from 'react-icons/io';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const Content = styled.div``;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
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

const Sections = styled.div``;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Text = styled.div`
  text-align: center;
  width: 100%;
`;

const SendBtn = styled.button`
  border: ${(props) => props.theme.mainBorder};
  border-bottom: none;
  width: 130px;
  height: 30px;
  font-size: 13px;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
`;

const MyProductPreseneter = ({
  toSendPurchase,
  sendedPurchase,
  exchange,
  refund,
  error,
  submitSend,
  submitExchange,
  submitRefund,
  toSendNum,
  sendedNum,
  exchangeNum,
  refundNum,
}) => {
  const [filter, setFilter] = useState('toSend');

  const getToSend = () => {
    setFilter('toSend');
  };

  const getSended = () => {
    setFilter('sended');
  };

  const getExchange = () => {
    setFilter('exchange');
  };

  const getRefund = () => {
    setFilter('refund');
  };

  var product = toSendPurchase;

  if (filter === 'toSend') {
    product = toSendPurchase;
  } else if (filter === 'sended') {
    product = sendedPurchase;
  } else if (filter === 'exchange') {
    product = exchange;
  } else if (filter === 'refund') {
    product = refund;
  }

  return (
    <Container>
      <Title>주문내역</Title>
      <Content>
        <Filter>
          <FilterBtn onClick={getToSend}>
            <IoIosCheckmark
              style={{
                display: filter === 'toSend' ? '' : 'none',
                color: '#ff595c',
              }}
            />
            배송요청 상품
          </FilterBtn>
          <FilterBtn onClick={getSended}>
            <IoIosCheckmark
              style={{
                display: filter === 'sended' ? '' : 'none',
                color: '#ff595c',
              }}
            />
            배송완료 상품
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
        <Sections>
          <Section>
            {product && product.length > 0 ? (
              <>
                {product.map((item) => (
                  <Fragment key={`itme${item.id}`}>
                    {filter === 'toSend' ? (
                      <SendBtn id={item.id} onClick={submitSend}>
                        배송완료 처리하기
                      </SendBtn>
                    ) : filter === 'sended' ? (
                      <SendBtn
                        style={{ color: 'blue', opacity: 0.7, cursor: 'auto' }}
                      >
                        배송완료
                      </SendBtn>
                    ) : filter === 'exchange' && item.exchange === false ? (
                      <SendBtn id={item.id} onClick={submitExchange}>
                        교환요청 처리하기
                      </SendBtn>
                    ) : filter === 'exchange' && item.exchange === true ? (
                      <SendBtn
                        style={{ color: 'blue', opacity: 0.7, cursor: 'auto' }}
                      >
                        교환요청 완료
                      </SendBtn>
                    ) : filter === 'refund' && item.refund === false ? (
                      <SendBtn id={item.id} onClick={submitRefund}>
                        환불요청 처리하기
                      </SendBtn>
                    ) : (
                      <SendBtn
                        style={{ color: 'blue', opacity: 0.7, cursor: 'auto' }}
                      >
                        환불요청 완료
                      </SendBtn>
                    )}
                    <PurchaseSection
                      key={item.id}
                      purchasedId={item.id}
                      id={item.product.id}
                      imageUrl={item.product.product_image}
                      name={item.product.name}
                      price={item.product.price}
                      option={item.option}
                      qty={item.qty}
                      buyer={item.user_name}
                      receiver={item.receiver}
                      address={item.address}
                      number={item.number}
                      email={item.email}
                      message={item.message}
                    />
                  </Fragment>
                ))}
              </>
            ) : (
              <Text>sex</Text>
            )}
          </Section>
          {product && product.length ? (
            <PageBar
              itemNum={
                filter === 'toSend'
                  ? toSendNum
                  : filter === 'sended'
                  ? sendedNum
                  : filter === 'exchange'
                  ? exchangeNum
                  : refundNum
              }
            />
          ) : null}
        </Sections>
      </Content>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

export default MyProductPreseneter;
