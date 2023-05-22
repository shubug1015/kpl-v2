import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { usersApi } from 'api';
import store, { logIn } from 'store';
import KakaoLogIn from 'Components/KakaoLogIn';
import NaverLogIn from 'Components/NaverLogIn';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LogInBox = styled.div`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  background-color: ${(props) => props.theme.whiteColor};
  width: 400px;
  height: 500px;
  margin: 50px;
`;

const LogInForm = styled.form``;

const Box = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
  font-size: 12px;
  :last-child {
    margin-top: 20px;
    &:hover {
      text-decoration: none;
      color: black;
      opacity: 0.7;
    }
  }
`;

const Title = styled.span`
  font-size: 20px;
`;

const IdInputBox = styled.input`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  padding-left: 10px;
  width: 250px;
  height: 40px;
  outline: none;
`;

const AlertText = styled.div`
  display: flex;
  justify-content: center;
  height: 15px;
  color: red;
  font-size: 11px;
  margin-top: 15px;
`;

const SaveLogged = styled.div`
  display: flex;
  align-items: center;
`;

const SaveLoggedCheck = styled.input`
  margin-right: 10px;
`;

const SubmitBtn = styled.input`
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  margin-bottom: 20px;
  width: 250px;
  height: 40px;
  outline: none;
`;

const SnsLogIn = styled.div`
  border-top: ${(props) => props.theme.mainBorder};
  padding-top: 10px;
`;

const ToSignUp = styled.div``;

const SLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: black;
    opacity: 0.7;
  }
`;

// const Logged = store.getState()?.user.logged;

const LogIn = ({ redux_saveLogInfo }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState('');
  const [user_pk, setUserPk] = useState('');

  const [localLogged, setLocalLogged] = useState(false);

  const saveLocal = () => {
    setLocalLogged(!localLogged);
  };

  const LOGIN_INFO = 'LogInInfo';

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

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    store.subscribe(() => {
      if (
        store.getState()?.user.logged &&
        store.getState()?.location[store.getState()?.location.length - 1]
          .location === '/login'
      ) {
        if (localLogged === true) {
          localStorage.setItem(
            LOGIN_INFO,
            JSON.stringify(store.getState().user)
          );
        } else {
          sessionStorage.setItem(
            LOGIN_INFO,
            JSON.stringify(store.getState().user)
          );
        }
        console.log('go back');
        history.goBack();
      }
    });
    try {
      const {
        data: { token },
        data: { user_pk },
      } = await usersApi.login(id, pw);
      setToken(token); //state
      setUserPk(user_pk);
      setLogged(true); //state
    } catch {
      setLogged('logInError');
    }
  }

  useEffect(() => {
    console.log('1');
    if (logged) {
      console.log('2');
      redux_saveLogInfo({ token, user_pk, logged }); //redux
    }
    return () => {
      console.log('unmount');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  return (
    <Container>
      <LogInBox>
        <LogInForm onSubmit={handleSubmit}>
          <Box>
            <Title>Log In</Title>
          </Box>
          <Box>
            <IdInputBox
              onChange={handleId}
              type='text'
              placeholder='아이디를 입력하세요.'
            />
          </Box>
          <Box>
            <IdInputBox
              onChange={handlePw}
              type='password'
              placeholder='비밀번호를 입력하세요.'
            />
          </Box>
          {logged !== 'logInError' ? (
            ''
          ) : (
            <AlertText>* 아이디 또는 비밀번호를 확인해 주세요</AlertText>
          )}
          <Box>
            <SaveLogged>
              <SaveLoggedCheck type='checkbox' onClick={saveLocal} />
              로그인상태 유지하기
            </SaveLogged>
          </Box>
          <Box>
            <SubmitBtn type='submit' value='로그인' />
          </Box>
        </LogInForm>
        <SnsLogIn>
          <Box>
            <KakaoLogIn history={history} />
          </Box>
          <Box>
            <NaverLogIn history={history} />
          </Box>
          <Box>
            <SLink to='/signup'>
              <ToSignUp>회원가입 ></ToSignUp>
            </SLink>
          </Box>
        </SnsLogIn>
      </LogInBox>
    </Container>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_saveLogInfo: (data) => dispatch(logIn(data)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
