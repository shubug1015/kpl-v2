import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import BasketSection from "./BasketSection";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { usersApi } from "api";
import { AiOutlineCheck } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-bottom: 30px;
`;

const Content = styled.div``;

const Title = styled.div`
  width: 95%;
  padding: 50px 50px;
  font-size: 22px;
`;

const UserName = styled.span`
  font-size: 28px;
`;

const ItemNumContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 92.4%;
  margin-left: 15px;
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
  padding: 5px 30px;
  margin-bottom: 10px;
`;

const Sections = styled.div`
  display: flex;
  align-items: center;
  border-top: ${(props) => props.theme.boldMainBorder};
  border-bottom: ${(props) => props.theme.boldMainBorder};
  width: 88vw;
  height: 50px;
  margin-left: 14.2px;
  font-size: 14px;
  opacity: 0.7;
`;

const ImageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
`;

const BrandTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
`;

const NameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 30px;
`;

const OptionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  height: 30px;
`;

const PriceTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
`;

const QtyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 30px;
`;

const PostPriceTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
`;

const TotalPriceTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
`;

const BasketSections = styled.div`
  width: 88vw;
`;

const BasketSectionItem = styled.div`
  width: 88vw;
  display: flex;
  align-items: center;
`;

const BasketSectionText = styled.div`
  text-align: center;
  font-size: 14px;
  width: 100%;
  padding: 80px 0;
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 45px;
`;

const DeleteBtn = styled.button`
  font-size: 12px;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 2px;
  width: 65px;
  height: 27px;
  margin-right: 10px;
  &:focus {
    outline: none;
  }
`;

const PurchaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PurchaseBtn = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 2px;
  background-color: #ffe2e3;
  width: 180px;
  height: 60px;
  margin-top: 30px;
  &:focus {
    outline: none;
  }
`;

const SLink = styled(Link)``;

const BasketPresenter = ({ user, basket, loading, error, directPurchase }) => {
  const [checkList, setCheckList] = useState(
    directPurchase ? [directPurchase] : []
  );

  const [updatedBasket, setUpdatedBasket] = useState(basket);
  const [checkedBasket, setCheckedBasket] = useState(basket);

  const check = (event) => {
    const checkId = parseInt(event.target.id);
    if (checkList.includes(checkId)) {
      setCheckList(
        checkList.filter((checked) => {
          return checked !== checkId;
        })
      );
    } else {
      setCheckList(checkList.concat(checkId));
    }
  };

  useEffect(() => {
    setCheckedBasket(basket.filter((i) => checkList.includes(i.id)));
  }, [checkList, basket]);

  const deleteAll = async (event) => {
    event.preventDefault();
    setUpdatedBasket([]);
    try {
      usersApi.deleteBasket(updatedBasket.map((i) => i.id));
    } catch {
      return;
    }
  };

  const deleteList = async (event) => {
    event.preventDefault();
    setUpdatedBasket(basket.filter((l) => !checkList.includes(l.id)));
    try {
      usersApi.deleteBasket(checkList);
    } catch {
      return;
    }
  };

  const alertPurchase = () => {
    alert("선택된 상품이 없습니다.");
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Content>
        <Title>
          <UserName>{user.name}</UserName> 님의 장바구니
        </Title>
        <ItemNumContainer>
          <ItemNum>총 {updatedBasket.length}개</ItemNum>
        </ItemNumContainer>
        <ItemContainer>
          <Sections>
            <ImageTitle>사진</ImageTitle>
            <BrandTitle>작가 / 브랜드</BrandTitle>
            <NameTitle>상품명</NameTitle>
            <OptionTitle>옵션</OptionTitle>
            <PriceTitle>판매가</PriceTitle>
            <QtyTitle>수량</QtyTitle>
            <PostPriceTitle>배송비</PostPriceTitle>
            <TotalPriceTitle>합계</TotalPriceTitle>
          </Sections>
          <BasketSections>
            {updatedBasket && updatedBasket.length > 0 ? (
              <>
                {updatedBasket.map((item) => (
                  <>
                    <BasketSectionItem>
                      <AiOutlineCheck
                        onClick={check}
                        key={`checkbox${item.id}`}
                        id={item.id}
                        style={{
                          border: checkList.includes(item.id)
                            ? "none"
                            : "1px solid #dbdbdb",
                          borderRadius: "2px",
                          backgroundColor: checkList.includes(item.id)
                            ? "#ffe2e3"
                            : "#fafafa",
                          color: checkList.includes(item.id)
                            ? "#333333"
                            : "gray",
                          cursor: "pointer",
                        }}
                      />
                      <BasketSection
                        key={item.id}
                        id={item.id}
                        productId={item.productId}
                        name={item.name}
                        option={item.option}
                        qty={item.qty}
                        brand={item.brand}
                        price={item.price}
                        imageUrl={item.product_image}
                      />
                    </BasketSectionItem>
                  </>
                ))}
              </>
            ) : (
              <BasketSectionText>
                장바구니에 담긴 상품이 없습니다.
              </BasketSectionText>
            )}
          </BasketSections>
        </ItemContainer>
        {updatedBasket && updatedBasket.length > 0 && (
          <>
            <DeleteContainer>
              <DeleteBtn onClick={deleteAll}>전체삭제</DeleteBtn>
              <DeleteBtn onClick={deleteList}>선택삭제</DeleteBtn>
            </DeleteContainer>
            <PurchaseContainer>
              {updatedBasket.length > 0 && checkList.length > 0 ? (
                <SLink to={{ pathname: "/purchase", state: { checkedBasket } }}>
                  <PurchaseBtn>구매하기</PurchaseBtn>
                </SLink>
              ) : (
                <div>
                  <PurchaseBtn onClick={alertPurchase}>구매하기</PurchaseBtn>
                </div>
              )}
            </PurchaseContainer>
          </>
        )}
      </Content>
      {error && <Message color="e74c3c" text={error} />}
    </Container>
  );
};

BasketPresenter.propTypes = {
  basket: PropTypes.array,
  // id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default BasketPresenter;
