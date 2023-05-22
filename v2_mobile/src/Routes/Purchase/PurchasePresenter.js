import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "Components/Loader";
import Message from "Components/Message";
import PurchaseSection from "./PurchaseSection";
import { FaCircle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderTitle = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 86vw;
  padding: 30px;
  font-size: 25px;
`;

const ListTitleContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 85vw;
  margin-top: 30px;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  border-bottom: none;
  width: 100px;
  padding: 15px;
  margin-top: 30px;
  font-size: 12px;
  font-weight: 800;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: ${(props) => props.theme.boldMainBorder};
  width: 85vw;
  margin-bottom: 30px;
`;

const Sections = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 14px;
`;

const ImageSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 15vw;
`;

const BrandSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 10vw;
`;

const NameSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 25vw;
`;

const OptionSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 5vw;
`;

const PriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const QtySectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 5vw;
`;

const PostPriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const TotalPriceSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 7vw;
`;

const PurchaseSections = styled.div`
  width: 100%;
  border-top: ${(props) => props.theme.boldMainBorder};
`;

const TotalPrice = styled.div`
  text-align: right;
  width: 88vw;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 40px;
  margin-right: 60px;
`;

const Savings = styled.div`
  text-align: right;
  width: 88vw;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 10px;
  margin-right: 62px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  width: 85vw;
  /* border: ${(props) => props.theme.mainBorder}; */
  padding: 30px;
  margin-bottom: 20px;
`;

const PostTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 84vw;
  margin-bottom: 30px;
`;

const PostTitle = styled.div`
  text-align: center;
  background: linear-gradient(#fafafa, #ffe7e7);
  width: 80px;
  height: 18px;
  font-size: 15px;
  font-weight: 900;
`;

const PostHaveTo = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-left: 10px;
`;

const PostSectionsContainer = styled.div``;

const PostSections = styled.div`
  border: ${(props) => props.theme.mainBorder};
  :not(:last-child) {
    border-bottom: none;
  }
  width: 85vw;
  height: 70px;
  /* margin-bottom: 5px; */
  display: flex;
`;

const PostSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.theme.mainBorder};
  width: 20vw;
  font-size: 11px;
  font-weight: 700;
`;

const PostSectionContents = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.whiteColor};
  width: 100%;
  padding: 10px;
`;

const PaymentContainer = styled.div`
  width: 80vw;
  height: 120px;
  margin: 20px 10px;
`;

const SavingsUseTitle = styled.div`
  text-align: center;
  background: linear-gradient(#fafafa, #ffe7e7);
  width: 80px;
  height: 18px;
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 800;
`;

const SavingsUseContent = styled.div`
  display: flex;
  width: 80vw;
  height: 80px;
  border: 1px solid black;
`;

const SavingsIHave = styled.div`
  width: 30vw;
  border-right: 1px dotted black;
`;

const SavingsIUse = styled.div`
  width: 30vw;
`;

const SavingsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 30px;
  font-size: 10px;
  font-weight: 700;
`;

const SavingsContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 50px;
  font-size: 15px;
  font-weight: 900;
`;

const PaymentPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  width: 85vw;
  padding-bottom: 30px;
  margin-bottom: 50px;
`;

const PaymentPriceTitle = styled.div`
  text-align: center;
  background: linear-gradient(#fafafa, #ffe7e7);
  width: 100px;
  height: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 900;
`;

const PaymentPriceBox = styled.div`
  border: 2px solid black;
  width: 80vw;
  height: 120px;
`;

const PaymentPriceBoxTitle = styled.div`
  display: flex;
  height: 40px;
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const PaymentPriceBoxSectionTitle = styled.div`
  height: 40px;
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
`;

const PaymentPriceBoxContent = styled.div`
  display: flex;
  height: 80px;
`;

const PaymentPriceBoxSectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 80px;
  font-weight: 900;
`;

// const SLink = styled(Link)`
//   &:hover {
//     text-decoration: none;
//     color: black;
//     opacity: 0.7;
//   }
// `;

const Input = styled.input`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 200px;
  height: 27px;
  padding-left: 5px;
  font-size: 11px;
  outline: none;
`;

const PurchasePresenter = ({ checkedBasket, user, loading, error }) => {
  let sum = checkedBasket
    .map((o) => o.price)
    .reduce((a, c) => {
      return a + c;
    });

  return loading ? (
    <Loader />
  ) : (
    <>
      <Container>
        <OrderTitle>구매하기</OrderTitle>
        <ListTitleContainer>
          <ListTitle>주문 내역</ListTitle>
        </ListTitleContainer>
        <ItemContainer>
          <Sections>
            <ImageSectionTitle>사진</ImageSectionTitle>
            <BrandSectionTitle>작가 / 브랜드</BrandSectionTitle>
            <NameSectionTitle>상품명</NameSectionTitle>
            <OptionSectionTitle>옵션</OptionSectionTitle>
            <PriceSectionTitle>판매가</PriceSectionTitle>
            <QtySectionTitle>수량</QtySectionTitle>
            <PostPriceSectionTitle>배송비</PostPriceSectionTitle>
            <TotalPriceSectionTitle>합계</TotalPriceSectionTitle>
          </Sections>
          <PurchaseSections>
            {checkedBasket && checkedBasket.length > 0 && (
              <>
                {checkedBasket.map((item) => (
                  <PurchaseSection
                    key={item.id}
                    id={item.id}
                    imageUrl={item.product_image}
                    brand={item.brand}
                    name={item.name}
                    option={item.option}
                    price={item.price}
                    qty={item.qty}
                  />
                ))}
              </>
            )}
          </PurchaseSections>
          <TotalPrice>총 주문금액 : {sum}원</TotalPrice>
          <Savings>적립 예상금액 : {sum / 10}원</Savings>
        </ItemContainer>
        <PostContainer>
          <PostTitleContainer>
            <PostTitle>배송 정보</PostTitle>
            <PostHaveTo>
              <FaCircle
                style={{ color: "red", marginRight: "3px", fontSize: "3px" }}
              />
              (필수 입력 정보)
            </PostHaveTo>
          </PostTitleContainer>
          <PostSectionsContainer>
            <PostSections>
              <PostSectionTitle>
                <FaCircle
                  style={{ color: "red", marginRight: "3px", fontSize: "3px" }}
                />
                받으시는 분
              </PostSectionTitle>
              <PostSectionContents>
                <Input type="text" placeholder={user.name} />
              </PostSectionContents>
            </PostSections>
            <PostSections>
              <PostSectionTitle>
                <FaCircle
                  style={{ color: "red", marginRight: "3px", fontSize: "3px" }}
                />
                주소
              </PostSectionTitle>
              <PostSectionContents>
                <Input type="text" placeholder="주소를 입력해주세요." />
              </PostSectionContents>
            </PostSections>
            <PostSections>
              <PostSectionTitle>
                <FaCircle
                  style={{ color: "red", marginRight: "3px", fontSize: "3px" }}
                />
                휴대폰 번호
              </PostSectionTitle>
              <PostSectionContents>
                <Input type="text" placeholder={user.phone_number} />
              </PostSectionContents>
            </PostSections>
            <PostSections>
              <PostSectionTitle>
                <FaCircle
                  style={{ color: "red", marginRight: "3px", fontSize: "3px" }}
                />
                이메일 주소
              </PostSectionTitle>
              <PostSectionContents>
                <Input type="text" placeholder={user.email} />
              </PostSectionContents>
            </PostSections>
            <PostSections>
              <PostSectionTitle>배송 메세지</PostSectionTitle>
              <PostSectionContents>
                <Input type="text" placeholder="배송 메세지를 입력해주세요." />
              </PostSectionContents>
            </PostSections>
          </PostSectionsContainer>
        </PostContainer>
        <PaymentPriceContainer>
          <PaymentContainer>
            <SavingsUseTitle>적립금 사용</SavingsUseTitle>
            <SavingsUseContent>
              <SavingsIHave>
                <SavingsTitle>보유 적립금</SavingsTitle>
                <SavingsContent>(보유 적립금) point</SavingsContent>
              </SavingsIHave>
              <SavingsIUse>
                <SavingsTitle>사용 적립금</SavingsTitle>
                <SavingsContent>
                  <Input style={{ height: "20px", marginRight: "10px" }} />{" "}
                  point
                </SavingsContent>
              </SavingsIUse>
            </SavingsUseContent>
          </PaymentContainer>
          <PaymentContainer>
            <PaymentPriceTitle>최종 결제 금액</PaymentPriceTitle>
            <PaymentPriceBox>
              <PaymentPriceBoxTitle>
                <PaymentPriceBoxSectionTitle>
                  총 주문 금액
                </PaymentPriceBoxSectionTitle>
                <PaymentPriceBoxSectionTitle>
                  총 할인 금액
                </PaymentPriceBoxSectionTitle>
                <PaymentPriceBoxSectionTitle>TOTAL</PaymentPriceBoxSectionTitle>
              </PaymentPriceBoxTitle>
              <PaymentPriceBoxContent>
                <PaymentPriceBoxSectionContent>
                  (주문 금액)
                </PaymentPriceBoxSectionContent>
                <PaymentPriceBoxSectionContent>
                  (할인 금액)
                </PaymentPriceBoxSectionContent>
                <PaymentPriceBoxSectionContent>
                  (주문 금액 - 할인 금액)
                </PaymentPriceBoxSectionContent>
              </PaymentPriceBoxContent>
            </PaymentPriceBox>
          </PaymentContainer>
        </PaymentPriceContainer>
        {error && <Message color="e74c3c" text={error} />}
      </Container>
    </>
  );
};

PurchasePresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PurchasePresenter;
