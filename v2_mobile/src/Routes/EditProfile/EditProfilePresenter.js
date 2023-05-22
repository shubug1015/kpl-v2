import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { usersApi } from "api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  padding-top: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 50vw;
`;

const Info = styled.div`
  padding-left: 15px;
  padding-bottom: 15px;
  font-size: 24px;
`;

const ProfileForm = styled.form`
  border-top: ${(props) => props.theme.boldPinkBorder};
  border-right: ${(props) => props.theme.mainBorder};
`;

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const ProfileTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pinkColor};
  width: 150px;
  height: 50px;
`;

const Profile = styled.input`
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 100%;
  background-color: transparent;
  padding-left: 20px;
  outline: none;
`;

const Show = styled.input``;

const SaveBtn = styled.button``;

const Back = styled.button``;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const EditProfile = ({ user, loading, error }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const ShowPassword = () => {
    let i = document.getElementById("showpassword");
    if (i.type === "password") {
      i.type = "text";
    } else {
      i.type = "password";
    }
  };

  const handleName = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);
  };

  const handleEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  const handlePhoneNum = (event) => {
    const {
      target: { value },
    } = event;
    setPhoneNum(value);
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    try {
      await usersApi.editProfile(name, email, phoneNum);
      history.push("/mypage");
    } catch {
      alert("Error");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Content>
        <InfoContainer>
          <Info>회원정보수정</Info>
        </InfoContainer>
        <ProfileForm>
          <ProfileBox>
            <ProfileTitle>아이디</ProfileTitle>
            <div>{user.username}</div>
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>비밀번호</ProfileTitle>
            <Profile type="password" id="showpassword" />
            <Show type="checkbox" onClick={ShowPassword} />
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>닉네임</ProfileTitle>
            <Profile
              onChange={handleName}
              type="text"
              placeholder={user.name}
            />
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>이메일</ProfileTitle>
            <Profile
              onChange={handleEmail}
              type="text"
              placeholder={user.email}
            />
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>핸드폰 번호</ProfileTitle>
            <Profile
              onChange={handlePhoneNum}
              type="text"
              placeholder={user.phone_number}
            />
          </ProfileBox>
        </ProfileForm>
        <SaveBtn onClick={handleSubmit}>저장</SaveBtn>
        <SLink to="/mypage">
          <Back>취소</Back>
        </SLink>
        {error && <Message color="e74c3c" text={error} />}
      </Content>
    </Container>
  );
};

export default EditProfile;
