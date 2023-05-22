import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
  margin-top: 30px;
  padding-right: 50px;
  padding-left: calc(${(props) => props.theme.controllerWidth} + 50px);
`;

// const Title = styled.div`
//   ${(props) => props.theme.titleTag}
// `;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: pink; */
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 30%;
  height: 175px;
  :nth-child(4){
    height: 135px;
  };
  :nth-child(5){
    height: 135px;
  };
  padding: 20px;
  margin-bottom: 30px;
  margin-right: 3%;
`;

const BoxTitle = styled.div`
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 18px;
`;

const BoxContent = styled.div``;

const BoxItem = styled.div`
  display: flex;
  justify-content: space-between;
  :not(:first-child) {
    margin-top: 18px;
  }
  font-size: 16px;
  font-weight: 300;
`;

const BoxNum = styled.div``;

const MyInfo = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 30%;
  height: 330px;
  padding: 20px;
  margin-bottom: 30px;
  margin-right: 3%;
`;

const MyInfoTitle = styled.div`
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 20px;
`;

const MyInfoContent = styled.div``;

const MyInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  :not(:first-child) {
    margin-top: 22px;
  }
  font-size: 16px;
  font-weight: 300;
`;

const MyInfoNum = styled.div``;

const Profit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.3);
  width: 63%;
  height: 160px;
  padding: 0 20px;
  margin-top: -190px;
`;

const ProfitTitle = styled.div`
  text-align: center;
  line-height: 50px;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  height: 50px;
  padding-bottom: 10px;
  font-size: 18px;
`;

const ProfitContent = styled.div`
  text-align: center;
  line-height: 100px;
  width: 100%;
  height: 100px;
`;

const ProfitItem = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  :not(:first-child) {
    margin-top: 22px;
  }
  font-size: 28px;
  font-weight: 300;
`;

const ProfitNum = styled.div`
  position: absolute;
  left: 52%;
  font-size: 18px;
`;

const Fav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.3);
  width: 63%;
  height: 160px;
  padding: 0 20px;
`;

const FavTitle = styled.div`
  text-align: center;
  line-height: 50px;
  border-bottom: ${(props) => props.theme.mainBorder};
  width: 100%;
  height: 50px;
  padding-bottom: 10px;
  font-size: 18px;
`;

const FavContent = styled.div`
  text-align: center;
  line-height: 100px;
  width: 100%;
  height: 100px;
`;

const FavItem = styled.div`
  display: flex;
  justify-content: center;
  :not(:first-child) {
    margin-top: 22px;
  }
  font-size: 28px;
  font-weight: 300;
`;

const FavNum = styled.div`
  position: absolute;
  left: 52%;
  font-size: 18px;
`;

const SLink = styled(Link)`
  :not(:last-child) {
    margin-right: 70px;
  }
  &:hover {
    color: ${(props) => props.theme.blackColor};
    text-decoration: none;
    opacity: 0.7;
  }
`;

const Home = () => {
  return (
    <Container>
      {/* <Title>환영합니다</Title> */}
      <Content>
        <Box>
          <BoxTitle>전날 결산내역</BoxTitle>
          <BoxContent>
            <BoxItem>
              신규주문 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              입금내역 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              신규문의 <BoxNum>?건</BoxNum>
            </BoxItem>
          </BoxContent>
        </Box>
        <Box>
          <BoxTitle>배송상태</BoxTitle>
          <BoxContent>
            <BoxItem>
              배송요청 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              배송중 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              배송완료 <BoxNum>?건</BoxNum>
            </BoxItem>
          </BoxContent>
        </Box>
        <Box>
          <BoxTitle>요청내역</BoxTitle>
          <BoxContent>
            <BoxItem>
              취소요청 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              교환요청 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              환불요청 <BoxNum>?건</BoxNum>
            </BoxItem>
          </BoxContent>
        </Box>
        <Box>
          <BoxTitle>문의사항</BoxTitle>
          <BoxContent>
            <BoxItem>
              미답변 리뷰 <BoxNum>?건</BoxNum>
            </BoxItem>
            <BoxItem>
              미답변 문의사항 <BoxNum>?건</BoxNum>
            </BoxItem>
          </BoxContent>
        </Box>
        <Box>
          <BoxTitle>고객관리</BoxTitle>
          <BoxContent>
            <BoxItem>알림보내기</BoxItem>
            <BoxItem>고객층 확인하기</BoxItem>
          </BoxContent>
        </Box>
        <MyInfo>
          <MyInfoTitle>내 상품정보</MyInfoTitle>
          <MyInfoContent>
            <MyInfoItem>내 상품 확인하기</MyInfoItem>
            <MyInfoItem>내 상품 수정하기</MyInfoItem>
            <MyInfoItem>판매현황 확인하기</MyInfoItem>
            <MyInfoItem>상품 등록하기</MyInfoItem>
            <MyInfoItem>
              재고 10개 이하 상품<MyInfoNum>?건</MyInfoNum>
            </MyInfoItem>
            <MyInfoItem>
              품절상품<MyInfoNum>?건</MyInfoNum>
            </MyInfoItem>
            <MyInfoItem>
              세일중 상품<MyInfoNum>?건</MyInfoNum>
            </MyInfoItem>
          </MyInfoContent>
        </MyInfo>
        <Profit>
          <ProfitTitle>매출</ProfitTitle>
          <ProfitContent>
            <ProfitItem>
              ??????원
              <ProfitNum>
                <AiFillCaretUp style={{ color: '#42e530' }} />
                ???
              </ProfitNum>
            </ProfitItem>
          </ProfitContent>
        </Profit>
        <Fav>
          <FavTitle>내 작품 좋아요</FavTitle>
          <FavContent>
            <FavItem>
              ??????개
              <FavNum>
                <AiFillCaretDown style={{ color: '#ff595c' }} />
                ???
              </FavNum>
            </FavItem>
          </FavContent>
        </Fav>
      </Content>
    </Container>
  );
};

export default Home;
