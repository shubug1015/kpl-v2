import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  border-radius: 4px;
  width: 80vw;
  margin-bottom: 30px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  font-size: 12px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => props.theme.boldPinkBorder};
  border-radius: 4px;
  width: 200px;
  padding: 10px;
`;

const Text = styled.div`
  font-size: 18px;
  :not(:last-child) {
    font-size: 24px;
    font-weight: 800;
    margin-right: 10px;
  }
`;

const EnterBox = styled.div`
  display: flex;
  justify-content: center;
`;

const EnterBorder = styled.div`
  /* border: ${(props) => props.theme.mainBorder}; */
  border-radius: 5px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 900px;
  height: 1550px;
`;

const EnterForm = styled.form``;

const EnterList = styled.div`
  display: flex;
  justify-content: left;
  background-color: ${(props) => props.theme.whiteColor};
  border: ${(props) => props.theme.pinkBorder};
  border-radius: 12px;
  padding: 30px;
  margin: 30px 70px;
  :nth-child(5) {
    margin-bottom: 50px;
  }
`;

const FormTitle = styled.div`
  width: 150px;
`;

const FormContent = styled.input`
  border: none;
  border-bottom: ${(props) => props.theme.mainBorder};
  padding-left: 5px;
  font-size: 13px;
  outline: none;
`;

const CategoryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 180px);
  grid-template-rows: repeat(7, 70px);
`;

const Category = styled.div``;

const Summury = styled.textarea`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 600px;
  height: 400px;
  padding-top: 5px;
  padding-left: 10px;
  font-size: 13px;
  overflow: auto;
  outline: none;
`;

const SubmitBox = styled.input`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.whiteColor};
  margin-bottom: 20px;
  width: 100px;
  height: 40px;
  outline: none;
`;

const Entering = () => {
  const List = [
    "옷",
    "악세사리",
    "하네스",
    "목줄",
    "자동리드줄",
    "이동가방",
    "배변봉투",
    "집",
    "방석",
    "울타리",
    "계단",
    "배변용품",
    "기저귀",
    "목욕용품",
    "브러쉬",
    "그릇",
    "급수기",
    "장난감",
    "노즈워크",
    "훈련용품",
  ];

  return (
    <Container>
      <Content>
        <Box>
          <Title>
            <Text>DORUS</Text>
            <Text>입점하기</Text>
          </Title>
        </Box>
        <EnterBox>
          <EnterBorder>
            <EnterForm>
              <EnterList>
                <FormTitle>1. 작가명/브랜드명</FormTitle>
                <FormContent type="text" placeholder="작성하기" />
              </EnterList>
              <EnterList>
                <FormTitle>2. 연락처</FormTitle>
                <FormContent type="text" placeholder="작성하기" />
              </EnterList>
              <EnterList>
                <FormTitle>3. 이메일</FormTitle>
                <FormContent type="text" placeholder="작성하기" />
              </EnterList>
              <EnterList>
                <FormTitle>4. 카테고리</FormTitle>
                <CategoryBox>
                  {List.map((i) => (
                    <Category>
                      <FormContent type="checkbox" value="옷" />
                      {i}
                    </Category>
                  ))}
                </CategoryBox>
              </EnterList>
              <EnterList>
                <FormTitle>5. 요약</FormTitle>
                <Summury type="text" placeholder="작성하기" />
              </EnterList>
              <Box>
                <SubmitBox type="submit" value="제출하기" />
              </Box>
            </EnterForm>
          </EnterBorder>
        </EnterBox>
      </Content>
    </Container>
  );
};

export default Entering;
