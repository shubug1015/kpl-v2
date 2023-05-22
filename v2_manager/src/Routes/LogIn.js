import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { managersApi } from 'api';
import store, { logIn } from 'store';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: calc(${(props) => props.theme.headerHeight} + 30px);
`;

const LogInBox = styled.div`
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  margin: 50px;
  background-color: ${(props) => props.theme.whiteColor};
  width: 400px;
  height: 500px;
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

const LogIn = ({ redux_saveLogIn }) => {
  // const Logged = store.getState()?.user.logged;
  const LOGIN_INFO = 'LogInInfo';
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [localLogged, setLocalLogged] = useState(false);
  const history = useHistory();

  const saveLocal = () => {
    setLocalLogged(!localLogged);
  };

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

  async function handleSubmit(event) {
    event.preventDefault();
    store.subscribe(() => {
      if (
        store.getState()?.user.logged &&
        store.getState()?.location[store.getState()?.location.length - 1]
          .location === '/login'
      ) {
        if (localLogged) {
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
        history.push('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    try {
      const {
        data: { token },
      } = await managersApi.login(id, pw);
      setToken(token);
      setLogged(true);
    } catch {
      setLogged('logInError');
    }
  }

  useEffect(() => {
    if (logged) {
      redux_saveLogIn({ token: token, logged: true });
    }
    return;
    // eslint-disable-next-line
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
      </LogInBox>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { info: state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_saveLogIn: (data) => dispatch(logIn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
