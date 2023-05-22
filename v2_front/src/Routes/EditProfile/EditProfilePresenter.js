import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Message from 'Components/Message';
import { usersApi } from 'api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 24px;
`;

const Content = styled.div`
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38vw;
  padding-top: 30px;
`;

const ProfileForm = styled.form`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  background-color: ${(props) => props.theme.whiteColor};
  width: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  :not(:last-child) {
    border-bottom: ${(props) => props.theme.mainBorder};
  }
  height: 100px;
  font-size: 12px;
`;

const ProfileTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.theme.mainBorder};
  width: 30%;
  height: 100%;
  /* font-size: 13px; */
`;

const ProfileId = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 30%;
  height: 30px;
  margin-left: 20px;
  padding-left: 5px;
  font-size: 13px;
  outline: none;
`;

const Profile = styled.input`
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  border-bottom: 1px solid black;
  border-radius: 1px;
  width: 30%;
  height: 30px;
  margin-left: 20px;
  padding-left: 5px;
  outline: none;
`;

const Show = styled.input`
  margin-left: 20px;
  margin-right: 5px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const SaveBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 80px;
  height: 30px;
  margin-right: 20px;
  font-size: 13px;
`;

const BackBtn = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.mainColor};
  width: 80px;
  height: 30px;
  font-size: 13px;
`;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

const EditProfilePresenter = ({ user, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const ShowPassword = () => {
    let i = document.getElementById('showpassword');
    if (i.type === 'password') {
      i.type = 'text';
    } else {
      i.type = 'password';
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
    try {
      await usersApi.editProfile(name, email, phoneNum);
      history.push('/mypage');
    } catch {
      alert('Error');
    }
  };

  return (
    <Container>
      <Title>회원정보수정</Title>
      <Content>
        <ProfileForm>
          <ProfileBox>
            <ProfileTitle>아이디</ProfileTitle>
            <ProfileId>{user.username}</ProfileId>
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>비밀번호</ProfileTitle>
            <Profile type='password' id='showpassword' />
            <Show type='checkbox' onClick={ShowPassword} />
            비밀번호 보기
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>닉네임</ProfileTitle>
            <Profile
              onChange={handleName}
              type='text'
              placeholder={user.name}
            />
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>이메일</ProfileTitle>
            <Profile
              onChange={handleEmail}
              type='text'
              placeholder={user.email}
            />
          </ProfileBox>
          <ProfileBox>
            <ProfileTitle>핸드폰 번호</ProfileTitle>
            <Profile
              onChange={handlePhoneNum}
              type='text'
              placeholder={user.phone_number}
            />
          </ProfileBox>
        </ProfileForm>
        <Btns>
          <SaveBtn onClick={handleSubmit}>저장</SaveBtn>
          <SLink to='/mypage'>
            <BackBtn>취소</BackBtn>
          </SLink>
        </Btns>
        {error && <Message color='e74c3c' text={error} />}
      </Content>
    </Container>
  );
};

EditProfilePresenter.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default EditProfilePresenter;
