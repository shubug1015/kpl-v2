import React, { Component } from "react";
import styled from "styled-components";
import NaverLogin from "react-naver-login";
import { usersApi } from "api";
import { connect } from "react-redux";
import store, { logIn } from "store";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const NaverBtn = styled.div`
  padding: 0;
  width: 250px;
  height: 40px;
  line-height: 40px;
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

class NaverLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      nickname: "",
      email: "",
      provider: "",
      logged: false,
      error: null,
      loading: true,
    };
  }
  responseNaver = async (res) => {
    try {
      if (res.nickname !== undefined) {
        this.setState(
          {
            id: res.id,
            nickname: res.nickname,
            email: res.email,
            provider: "naver",
          },
          async () => {
            const {
              data: { token },
              data: { user_pk },
            } = await usersApi.naverLogin(
              this.state.nickname,
              this.state.email
            );
            this.props.redux_saveLogInfo({ token, user_pk, logged: true });
          }
        );
      } else {
        this.setState(
          {
            id: res.id,
            name: res.name,
            email: res.email,
            provider: "naver",
          },
          async () => {
            const {
              data: { token },
              data: { user_pk },
            } = await usersApi.naverLogin(this.state.name, this.state.email);
            this.props.redux_saveLogInfo({ token, user_pk, logged: true });
          }
        );
      }
    } catch {
      this.setState({
        error: "Can't find user",
      });
    } finally {
      this.setState({ loading: false });
    }
    store.subscribe(() => {
      sessionStorage.setItem(
        "LogInInfo",
        JSON.stringify(store.getState().user)
      );
      this.props.history.goBack();
    });
  };

  responseFail = (err) => {
    console.log(err);
  };

  render() {
    return (
      <Container>
        <NaverBtn>
          <NaverLogin
            clientId="nG4Eq4uL7iBISNr7r5Um"
            callbackUrl="http://127.0.0.1:3000/login"
            render={(props) => <div onClick={props.onClick}>네이버 로그인</div>}
            onSuccess={this.responseNaver}
            onFailure={this.responseFail}
          />
        </NaverBtn>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redux_saveLogInfo: (data) => dispatch(logIn(data)),
  };
};

export default connect(null, mapDispatchToProps)(NaverLogIn);
