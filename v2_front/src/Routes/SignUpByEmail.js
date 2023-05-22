import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { usersApi } from "api";

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

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpBorder = styled.div`
  border: ${(props) => props.theme.mainBorder};
  background-color: #ffffff;
  width: 450px;
  padding: 40px;
`;

const SectionTitle = styled.div`
  width: 80px;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
`;
const SectionBox = styled.input`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 300px;
  height: 35px;
  padding-left: 10px;
  margin: 5px 0px;
  font-size: 12px;
  outline: none;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SubmitContainer = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  margin: 20px 0px;
  width: 250px;
  height: 40px;
  outline: none;
`;

const Check = styled.div`
  padding-top: 10px;
  margin-left: 5px;
  font-size: 12px;
  color: red;
`;

const Checked = styled.span`
  font-size: 12px;
  color: blue;
`;

const SignUpByEmail = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [checkId, setCheckId] = useState(0);
  const [checkPw, setCheckPw] = useState(0);
  const [checkName, setCheckName] = useState(0);
  const [checkEmail, setCheckEmail] = useState(false);

  function handleId(event) {
    const {
      target: { value },
    } = event;
    setId(value);
  }

  function handlePw(event) {
    const {
      target: { value },
    } = event;
    setPw(value);
  }

  function handlePwCheck(event) {
    const {
      target: { value },
    } = event;
    setPwCheck(value);
  }

  function handleName(event) {
    const {
      target: { value },
    } = event;
    setName(value);
  }

  function handleEmail(event) {
    const {
      target: { value },
    } = event;
    setEmail(value);
  }

  function handlePhoneNum(event) {
    const {
      target: { value },
    } = event;
    setPhoneNum(value);
  }

  const confirmId = async () => {
    // checkId === 3 인 경우 회원가입 가능
    if (id === "") {
      setCheckId(0);
    } else if (id.length < 4 || id.length > 12) {
      setCheckId(1);
    } else {
      const { data: useId } = await usersApi.checkId(id);
      if (useId === "used id") {
        setCheckId(2);
      } else {
        setCheckId(3);
      }
    }
  };

  const confirmPw = () => {
    // checkPw === false 인 경우 회원가입 가능
    if (pw === "" && pwCheck === "") {
      setCheckPw(0);
    } else if (pw !== pwCheck) {
      setCheckPw(true);
    } else {
      setCheckPw(false);
    }
  };

  const confirmName = async () => {
    // checkName === 3 인 경우 회원가입 가능
    if (name === "") {
      setCheckName(0);
    } else if (name.length < 3 || name.length > 9) {
      setCheckName(1);
    } else {
      const { data: useName } = await usersApi.checkName(name);
      if (useName === "used name") {
        setCheckName(2);
      } else {
        setCheckName(3);
      }
    }
  };

  const confirmEmail = () => {
    // checkEmail === false 인 경우 회원가입 가능
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      checkId === 3 &&
      checkPw === false &&
      checkName === 3 &&
      checkEmail === false
    ) {
      try {
        await usersApi.signup(id, pw, pwCheck, name, email, phoneNum);
        history.push("/login");
      } catch {
        alert("Error");
      }
    } else {
      alert("Check again");
    }
  };

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
            <Section>
              <SectionTitle>ID</SectionTitle>
              <SectionBox
                onChange={handleId}
                onBlur={confirmId}
                type="text"
                placeholder="사용하실 ID를 입력하세요."
              />
              <Check style={{ visibility: checkId === 0 ? "hidden" : "" }}>
                {checkId === 1 ? (
                  "아이디는 4~12자리 이어야 합니다."
                ) : checkId === 2 ? (
                  "이미 사용중인 아이디입니다."
                ) : (
                  <Checked>사용가능한 아이디입니다.</Checked>
                )}
              </Check>
            </Section>
            <Section>
              <SectionTitle>비밀번호</SectionTitle>
              <SectionBox
                onChange={handlePw}
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
              <SectionBox
                onChange={handlePwCheck}
                onBlur={confirmPw}
                type="password"
                placeholder="비밀번호를 다시 한번 입력하세요."
              />
              <Check style={{ visibility: checkPw === 0 ? "hidden" : "" }}>
                {checkPw ? (
                  "비밀번호가 일치하지 않습니다"
                ) : (
                  <Checked>비밀번호가 일치합니다</Checked>
                )}
              </Check>
            </Section>
            <Section>
              <SectionTitle>닉네임</SectionTitle>
              <SectionBox
                onChange={handleName}
                onBlur={confirmName}
                type="text"
                placeholder="닉네임을 입력하세요."
              />
              <Check style={{ visibility: checkName === 0 ? "hidden" : "" }}>
                {checkName === 1 ? (
                  "닉네임은 3~9자리 이어야 합니다."
                ) : checkName === 2 ? (
                  "이미 사용중인 닉네임입니다."
                ) : (
                  <Checked>사용가능한 닉네임입니다.</Checked>
                )}
              </Check>
            </Section>
            <Section>
              <SectionTitle>Email</SectionTitle>
              <SectionBox
                onChange={handleEmail}
                onBlur={confirmEmail}
                type="text"
                placeholder="이메일을 입력하세요."
              />
              <Check style={{ visibility: checkEmail ? "" : "hidden" }}>
                올바르지 않은 이메일 형식입니다.
              </Check>
            </Section>
            <Section>
              <SectionTitle>전화번호</SectionTitle>
              <SectionBox
                onChange={handlePhoneNum}
                type="text"
                placeholder="전화번호를 입력하세요."
              />
            </Section>
            <SubmitContainer>
              <SubmitBtn onClick={handleSubmit}>회원가입</SubmitBtn>
            </SubmitContainer>
          </SignUpBorder>
        </SignUpBox>
      </Content>
    </Container>
  );
};

export default SignUpByEmail;
