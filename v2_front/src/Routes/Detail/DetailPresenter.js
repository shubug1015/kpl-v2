import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import store, { recentProduct, deleteProduct } from 'store';
import ReviewSection from 'Components/Sections/ReviewSection';
import DetailImageSection from 'Components/Sections/DetailImageSection';
import QnASection from 'Components/Sections/QnASection';
import RecentSection from 'Components/Sections/RecentSection';
import Message from 'Components/Message';
import 'Routes/Detail/Detail.css';
import { usersApi } from 'api';
import { IoIosHeartEmpty } from 'react-icons/io';

const Container = styled.div`
  width: 90vw;
  padding-top: 50px;
  margin: 0px 5vw;
`;

const Content = styled.div`
  @media only screen and (max-width: 765px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Cover = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
    height: 90vw;
  }
  width: 60%;
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Data = styled.div`
  @media only screen and (max-width: 765px) {
    width: 100%;
  }
  width: 40%;
  border: ${(props) => props.theme.mainBorder};
  padding: 20px 20px;
`;

const Company = styled.div`
  border-bottom: ${(props) => props.theme.boldPinkBorder};
  padding-bottom: 15px;
  font-size: 12px;
  opacity: 0.7;
`;

const ItemContainer = styled.div``;

const Name = styled.div`
  border-bottom: ${(props) => props.theme.mainBorder};
  padding: 20px 0px;
  font-size: 22px;
`;

const Item = styled.div`
  :not(:last-child) {
    border-bottom: ${(props) => props.theme.mainBorder};
  }
  padding: 20px 0px;
  font-size: 13px;
  opacity: 0.7;
  display: flex;
  align-items: center;
`;

const ItemTitle = styled.div`
  width: 10vw;
`;

const Select = styled.select`
  border: ${(props) => props.theme.mainBorder};
  /* width: 60%; */
  height: 30px;
  outline: none;
`;
const Option = styled.option`
  width: 100%;
`;

const QtyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  height: 30px;
  outline: none;
`;

const QtyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  font-weight: 700;
`;

const QtyBtn = styled.button`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 3px;
  width: 20px;
  height: 20px;
  padding: 0;
  color: black;
  &:focus {
    outline: none;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const BasketCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-left: 70px;
  width: 300px;
  height: 100px;
  padding-top: 20px;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.2);
`;

const BasketCheck = styled.div`
  width: 300px;
  height: 90px;
`;

const BasketCheckText = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 30px;
  font-size: 15px;
`;

const BasketCheckBtns = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const BasketCheckBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 100px;
  height: 20px;
  font-size: 13px;
  cursor: pointer;
`;

const PurchaseBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 150px;
  height: 50px;
  margin-right: 10px;
  &:focus {
    outline: none;
  }
  font-size: 13px;
`;

const CartBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 150px;
  height: 50px;
  margin-right: 10px;
  &:focus {
    outline: none;
  }
  font-size: 13px;
`;

const LikeBtn = styled.button`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 60px;
  height: 50px;
  &:focus {
    outline: none;
  }
  /* background-color: #ffffff;
  background-color: #ff595c;
  color: black;
  color: #ffffff; */
`;

const DetailNavContainer = styled.div`
  /* width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder}; */
`;
const DetailNavBtn = styled.div`
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  opacity: 0.7;
  cursor: pointer;
`;

const DetailInfoContainer = styled.div`
  width: 100%;
  margin-top: 150px;
`;

const DetailTitle = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 17px;
  font-weight: 700;
  opacity: 0.7;
  margin-bottom: 10px;
`;

const DetailInfo = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const ReviewTextContainer = styled.div`
  width: 100%;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const ReviewTitleContainer = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  width: 100%;
  height: 30px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
  display: flex;
`;

const ReviewNumTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 13%;
`;

const ReviewTitleTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 40%;
`;

const ReviewNameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const ReviewDateTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const ReviewStarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const ReviewDelete = styled.div`
  width: 5%;
`;

const ReviewTitleContainerSmall = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  width: 100%;
  height: 30px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
  display: flex;
`;

const QnATextContainer = styled.div`
  width: 100%;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
`;

const QnATitleContainer = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  width: 100%;
  height: 30px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
  display: flex;
`;

const QnATitleContainerSmall = styled.div`
  @media only screen and (max-width: 765px) {
    display: none;
  }
  width: 100%;
  height: 30px;
  border-top: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
  display: flex;
`;

const QnALockTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 4.9%;
`;

const QnANumTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 2.3%;
`;

const QnATitleTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 42.8%;
`;

const QnANameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const QnADateTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const QnAReplyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  width: 15%;
`;

const DeleteQnA = styled.div`
  width: 5%;
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0px;
  font-size: 12px;
  font-weight: 900;
  opacity: 0.7;
  cursor: pointer;
`;

const WriteBtn = styled.div`
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  color: white;
  border-radius: 5px;
  float: right;
  margin: 10px 30px;
`;

const RecentContainer = styled.div``;

const RecentTitle = styled.div`
  text-align: center;
  width: 130px;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 15px;
`;

const Recent = styled.div`
  display: flex;
  align-items: center;
  border: ${(props) => props.theme.mainBorder};
  width: 100%;
  height: 300px;
  overflow: auto;
`;

const MoreText = styled.div`
  position: fixed;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  color: #333333;
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 10px;
  box-shadow: 0px 0px 100px 26px rgba(0, 0, 0, 0.75);
  z-index: 3;
  overflow: auto;
`;

const MoreTextTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

const MoreTextTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  opacity: 0.8;
  margin-left: 20px;
`;

const MoreTextClose = styled.div`
  position: fixed;
  right: 12%;
  top: 100px;
  width: 40px;
  height: 40px;
  font-size: 25px;
  font-weight: 900;
  opacity: 0.8;
  cursor: pointer;
`;

const MoreTextContainer = styled.div`
  width: 100%;
`;

const DetailImgContainer = styled.div`
  width: 100%;
`;

const SLink = styled(Link)`
  &:hover {
    color: #adadad;
    text-decoration: none;
  }
`;

const DetailPresenter = ({
  detail,
  check_favs,
  recent,
  reviews,
  qnas,
  error,
  redux_saveProduct,
  redux_removeProduct,
}) => {
  const ID = 'id';
  const OPT = 'option';
  const QTY = 'qty';
  const productImg = detail.detail_image;

  const [qty, setQty] = useState(1);
  const plusCount = () => setQty(qty + 1);
  const minusCount = () => (qty > 1 ? setQty(qty - 1) : setQty(qty));

  const [option, setOption] = useState('');
  const changeOption = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };
  const [favs, setFavs] = useState(check_favs);

  const checkFavs = (event) => {
    if (favs === 'fav') {
      deleteFav(event);
      setFavs('not fav');
    } else {
      addFav(event);
      setFavs('fav');
    }
  };

  const basketSubmit = async (event) => {
    const item = { [ID]: detail.id, [OPT]: option, [QTY]: qty };

    if (item.option !== '') {
      if (store.getState()?.user.logged) {
        try {
          await usersApi.addToBasket(item);
          basketBtnClick();
        } catch {
          return;
        }
      } else {
        return;
      }
    } else {
      alert('옵션을 선택해주세요');
    }
  };

  const history = useHistory();

  const purchaseToBasket = async () => {
    const item = { [ID]: detail.id, [OPT]: option, [QTY]: qty };
    var basketObjectId = null;

    if (item.option !== '') {
      try {
        if (store.getState()?.user.logged) {
          ({ data: basketObjectId } = await usersApi.addToBasket(item));
        }
      } catch {
        return;
      } finally {
        history.push({ pathname: '/basket', state: { basketObjectId } });
      }
    } else {
      alert('옵션을 선택해주세요');
    }
  };

  const addFav = async (event) => {
    event.preventDefault();
    if (store.getState()?.user.logged) {
      try {
        await usersApi.addFavs(detail.id);
      } catch {
        return;
      }
    } else {
      return;
    }
  };

  const deleteFav = async (event) => {
    event.preventDefault();
    if (store.getState()?.user.logged) {
      try {
        await usersApi.deleteFavs(detail.id);
      } catch {
        return;
      }
    } else {
      return;
    }
  };

  const [basketClick, setBasketClick] = useState(false);
  const basketBtnClick = () => {
    setBasketClick(true);
  };
  const keepShopping = () => {
    setBasketClick(false);
  };

  useEffect(() => {
    redux_removeProduct(detail);
    redux_saveProduct(detail);
  }, [redux_removeProduct, redux_saveProduct, detail]);

  const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = () => {
      setState({ y: window.scrollY, x: window.scrollX });
    };
    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    });
    return state;
  };

  const { y } = useScroll();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const scrollToRef = (ref) =>
    window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop - 160 });

  const handleClick1 = () => scrollToRef(ref1);
  const handleClick2 = () => scrollToRef(ref2);
  const handleClick3 = () => scrollToRef(ref3);
  const handleClick4 = () => scrollToRef(ref4);

  const prereview = reviews.slice(0, 5);
  const preqna = qnas.slice(0, 5);

  const [reviewOpen, setReviewOpen] = useState(false);
  const showMoreReview = () => setReviewOpen(!reviewOpen);
  const [qnaOpen, setQnaOpen] = useState(false);
  const showMoreQnA = () => setQnaOpen(!qnaOpen);

  if (detail.options !== '') {
    var options = detail.options;
  } else {
    options = [];
  }

  return (
    <Container
      onClick={() => {
        if (basketClick === true) {
          setBasketClick(false);
        }
      }}
    >
      <Helmet>
        <title>{detail.name} | DORUS</title>
      </Helmet>
      <Content>
        <Cover bgUrl={detail.product_image} />
        <Data>
          <Company>작가/브랜드명(링크) </Company>
          <ItemContainer>
            <Name>{detail.name}</Name>
            <Item>{detail.price}</Item>
            <Item>
              <ItemTitle>옵션</ItemTitle>
              <Select onChange={changeOption}>
                <Option value='null'>-----옵션을 선택하세요-----</Option>
                {options.map((item, index) => (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item>
              <ItemTitle>수량</ItemTitle>
              <QtyContainer>
                <QtyBtn onClick={minusCount}>-</QtyBtn>
                <QtyBox>{qty}</QtyBox>
                <QtyBtn onClick={plusCount}>+</QtyBtn>
              </QtyContainer>
            </Item>
            <Item>
              <ItemTitle>배송비</ItemTitle>
            </Item>
          </ItemContainer>
          <Box>
            {store.getState()?.user.logged ? (
              <>
                <PurchaseBtn onClick={purchaseToBasket}>구매하기</PurchaseBtn>
                <CartBtn onClick={basketSubmit}>장바구니</CartBtn>
                <LikeBtn
                  onClick={checkFavs}
                  style={{
                    backgroundColor: favs === 'fav' ? '#ff595c' : '#ffffff',
                    color: favs === 'fav' ? '#ffffff' : 'black',
                  }}
                >
                  <IoIosHeartEmpty size='25' />
                </LikeBtn>
              </>
            ) : (
              <>
                <SLink to='/login'>
                  <PurchaseBtn>구매하기</PurchaseBtn>
                  <CartBtn>장바구니</CartBtn>
                </SLink>
                <SLink to='/login'>
                  <LikeBtn
                    style={{
                      backgroundColor: favs === 'fav' ? '#ff595c' : '#ffffff',
                      color: favs === 'fav' ? '#ffffff' : 'black',
                    }}
                  >
                    <IoIosHeartEmpty size='25' />
                  </LikeBtn>
                </SLink>
              </>
            )}
          </Box>
          <BasketCheckContainer
            style={{
              visibility: basketClick ? '' : 'hidden',
            }}
          >
            <BasketCheck>
              <BasketCheckText>상품이 장바구니에 담겼습니다.</BasketCheckText>
              <BasketCheckBtns>
                <BasketCheckBtn onClick={keepShopping}>
                  계속 쇼핑하기
                </BasketCheckBtn>
                <SLink to={{ pathname: '/basket' }}>
                  <BasketCheckBtn>확인하기</BasketCheckBtn>
                </SLink>
              </BasketCheckBtns>
            </BasketCheck>
          </BasketCheckContainer>
        </Data>
      </Content>
      <DetailNavContainer className={y > 1032 ? 'stick' : 'unstick'}>
        <DetailNavBtn onClick={handleClick1}>상품 정보</DetailNavBtn>
        <DetailNavBtn onClick={handleClick2}>구매 정보</DetailNavBtn>
        <DetailNavBtn onClick={handleClick3}>구매평</DetailNavBtn>
        <DetailNavBtn onClick={handleClick4}>문의하기</DetailNavBtn>
      </DetailNavContainer>
      <DetailInfoContainer>
        <DetailTitle ref={ref1}>상품 정보</DetailTitle>
        <DetailInfo>
          {productImg && productImg.length > 0 && (
            <React.Fragment key={detail.id}>
              {productImg.map((item) => (
                <DetailImgContainer key={item.id}>
                  <DetailImageSection
                    key={item.id}
                    id={item.id}
                    imageUrl={item.file}
                  />
                </DetailImgContainer>
              ))}
            </React.Fragment>
          )}
        </DetailInfo>
        <DetailTitle ref={ref2}>구매 정보</DetailTitle>
        <DetailInfo></DetailInfo>
        <DetailTitle ref={ref3}>
          구매평{' '}
          {/* <span
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '5px',
              backgroundColor: 'skyblue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              marginLeft: '7px',
            }}
          >
            {reviews.length}
          </span> */}
          ({reviews.length})
        </DetailTitle>
        <DetailInfo>
          <ReviewTitleContainer>
            <ReviewNumTitle>NO.</ReviewNumTitle>
            <ReviewTitleTitle>제목</ReviewTitleTitle>
            <ReviewNameTitle>작성자</ReviewNameTitle>
            <ReviewDateTitle>작성일</ReviewDateTitle>
            <ReviewStarTitle>별점</ReviewStarTitle>
            <ReviewDelete></ReviewDelete>
          </ReviewTitleContainer>
          <ReviewTextContainer>
            {reviewOpen ? (
              <MoreText>
                <MoreTextTop>
                  <MoreTextTitle>구매평</MoreTextTitle>
                  <MoreTextClose onClick={showMoreReview}>X</MoreTextClose>
                </MoreTextTop>
                {reviews && reviews.length > 0 && (
                  <React.Fragment key={detail.id}>
                    <ReviewTitleContainerSmall>
                      <ReviewNumTitle>NO.</ReviewNumTitle>
                      <ReviewTitleTitle>제목</ReviewTitleTitle>
                      <ReviewNameTitle>작성자</ReviewNameTitle>
                      <ReviewDateTitle>작성일</ReviewDateTitle>
                      <ReviewStarTitle>별점</ReviewStarTitle>
                      <ReviewDelete></ReviewDelete>
                    </ReviewTitleContainerSmall>
                    {reviews.map((item) => (
                      <MoreTextContainer>
                        <ReviewSection
                          key={item.id}
                          ReviewId={item.id}
                          ProductId={detail.id}
                          num={item.num}
                          rating={item.rating}
                          title={item.title}
                          content={item.content}
                          name={item.user}
                          date={item.created}
                          user_pk={item.user_pk}
                          image={item.image}
                        />
                      </MoreTextContainer>
                    ))}
                  </React.Fragment>
                )}
              </MoreText>
            ) : null}
            {reviews && reviews.length > 0 && (
              <React.Fragment key={detail.id}>
                {prereview.map((item) => (
                  <ReviewSection
                    key={item.id}
                    ReviewId={item.id}
                    ProductId={detail.id}
                    num={item.num}
                    rating={item.rating}
                    title={item.title}
                    content={item.content}
                    name={item.user}
                    date={item.created}
                    user_pk={item.user_pk}
                    image={item.image}
                  />
                ))}
              </React.Fragment>
            )}
            {reviews.length > 5 ? (
              <ShowMore onClick={showMoreReview}>모든 구매평 보기 </ShowMore>
            ) : null}
            {/* <SLink
              to={
                store.getState()?.user.logged
                  ? {
                      pathname: '/review',
                      state: {
                        brand: detail.brand,
                        item: detail.name,
                        id: detail.id,
                      },
                    }
                  : '/login'
              }
            >
              <WriteBtn>작성하기</WriteBtn>
            </SLink> */}
          </ReviewTextContainer>
        </DetailInfo>
        <DetailTitle ref={ref4}>
          문의하기{' '}
          {/* <span
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '5px',
              backgroundColor: 'skyblue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              marginLeft: '7px',
            }}
          >
            {qnas.length}
          </span> */}
          ({qnas.length})
        </DetailTitle>
        <DetailInfo>
          <QnATitleContainer>
            <QnALockTitle></QnALockTitle>
            <QnANumTitle>NO.</QnANumTitle>
            <QnATitleTitle>제목</QnATitleTitle>
            <QnANameTitle>작성자</QnANameTitle>
            <QnADateTitle>작성일</QnADateTitle>
            <QnAReplyTitle>답변여부</QnAReplyTitle>
            <DeleteQnA></DeleteQnA>
          </QnATitleContainer>
          <QnATextContainer>
            {qnaOpen ? (
              <MoreText>
                <MoreTextTop>
                  <MoreTextTitle>문의사항</MoreTextTitle>
                  <MoreTextClose onClick={showMoreQnA}>X</MoreTextClose>
                </MoreTextTop>
                {qnas && qnas.length > 0 && (
                  <React.Fragment key={detail.id}>
                    <QnATitleContainerSmall>
                      <QnALockTitle></QnALockTitle>
                      <QnANumTitle>NO.</QnANumTitle>
                      <QnATitleTitle>제목</QnATitleTitle>
                      <QnANameTitle>작성자</QnANameTitle>
                      <QnADateTitle>작성일</QnADateTitle>
                      <QnAReplyTitle>답변여부</QnAReplyTitle>
                      <DeleteQnA></DeleteQnA>
                    </QnATitleContainerSmall>
                    {qnas.map((item) => (
                      <MoreTextContainer key={item.id}>
                        <QnASection
                          key={item.id}
                          QnAId={item.id}
                          ProductId={detail.id}
                          num={item.num}
                          title={item.title}
                          content={item.content}
                          name={item.user}
                          date={item.created}
                          secret={item.secret}
                          password={item.password}
                          user_pk={item.user_pk}
                          image={item.image}
                          replied={item.replied}
                          qna_reply={item.qna_reply}
                        />
                      </MoreTextContainer>
                    ))}
                  </React.Fragment>
                )}
              </MoreText>
            ) : null}
            {qnas && qnas.length > 0 && (
              <React.Fragment key={detail.id}>
                {preqna.map((item) => (
                  <QnASection
                    key={item.id}
                    QnAId={item.id}
                    ProductId={detail.id}
                    num={item.num}
                    title={item.title}
                    content={item.content}
                    name={item.user}
                    date={item.created}
                    secret={item.secret}
                    password={item.password}
                    user_pk={item.user_pk}
                    image={item.image}
                    replied={item.replied}
                    qna_reply={item.qna_reply}
                  />
                ))}
              </React.Fragment>
            )}
            {qnas.length > 5 ? (
              <ShowMore onClick={showMoreQnA}>모든 문의사항 보기</ShowMore>
            ) : null}
            <SLink
              to={
                store.getState()?.user.logged
                  ? {
                      pathname: '/qna',
                      state: {
                        brand: detail.brand,
                        item: detail.name,
                        id: detail.id,
                      },
                    }
                  : '/login'
              }
            >
              <WriteBtn>작성하기</WriteBtn>
            </SLink>
          </QnATextContainer>
        </DetailInfo>
      </DetailInfoContainer>
      <RecentContainer>
        <RecentTitle>최근 본 상품</RecentTitle>
        <Recent>
          {recent && recent.length > 0 && (
            <React.Fragment key={detail.id}>
              {recent.map((item) => (
                <RecentSection
                  key={item.id}
                  id={item.id}
                  imageUrl={item.product_image}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                />
              ))}
            </React.Fragment>
          )}
        </Recent>
      </RecentContainer>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

DetailPresenter.propTypes = {
  detail: PropTypes.object,
  imageUrl: PropTypes.string,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return { info: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redux_saveProduct: (data) => dispatch(recentProduct(data)),
    redux_removeProduct: (data) => dispatch(deleteProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPresenter);
