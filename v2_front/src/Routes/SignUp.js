import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosLogIn } from "react-icons/io";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  border-radius: 4px;
  width: 80vw;
  margin-top: 30px;
  margin-bottom: 80px;
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

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpBorder = styled.div`
  border: ${(props) => props.theme.mainBorder};
  background-color: #ffffff;
  width: 450px;
  height: 500px;
`;

const IntroSignUp = styled.div`
  padding-top: 30px;
  padding-bottom: 20px;
  padding-left: 30px;
  :not(:first-child) {
    margin-top: 30px;
  }
`;

const IntroTitle = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 390px;
  padding-bottom: 10px;
`;

const IntroText = styled.span`
  padding-left: 10px;
  font-size: 14px;
`;

const KakaoSignUp = styled.button`
  padding: 0;
  width: 250px;
  height: 40px;
  line-height: 40px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const NaverSignUp = styled.button`
  padding: 0;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  color: white;
  background-color: #65c33d;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const EmailSignUp = styled.button`
  background-color: #fafafa;
  border: ${(props) => props.theme.mainBorder};
  width: 250px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const SLink = styled(Link)``;

const SignUp = () => {
  return (
    <Container>
      <Content>
        <Box>
          <Title>
            <Text>DORUS</Text>
            <Text>회원가입</Text>
          </Title>
        </Box>
        <SignUpBox>
          <SignUpBorder>
            <IntroSignUp>
              <IntroTitle>
                <IntroText>회원가입</IntroText>
              </IntroTitle>
            </IntroSignUp>
            <Box>
              <SLink to="/signup_by_email">
                <EmailSignUp>
                  <IoIosLogIn
                    size="18"
                    style={{ marginRight: "10px", marginBottom: "2px" }}
                  />
                  이메일로 가입하기
                </EmailSignUp>
              </SLink>
            </Box>
            <Box style={{ marginTop: "30px", color: "blue" }}>
              회원가입시 혜택정보(쿠폰/배송비 1회무료 등등)
            </Box>
            <IntroSignUp>
              <IntroTitle>
                <IntroText>간편 로그인</IntroText>
              </IntroTitle>
            </IntroSignUp>
            <Box>
              <SLink to="/">
                <KakaoSignUp>카카오톡으로 로그인</KakaoSignUp>
              </SLink>
            </Box>
            <Box>
              <SLink to="/">
                <NaverSignUp>네이버로 로그인</NaverSignUp>
              </SLink>
            </Box>
          </SignUpBorder>
        </SignUpBox>
      </Content>
    </Container>
  );
};

export default SignUp;
