import React, { Component } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { usersApi } from "api";
import { connect } from "react-redux";
import store, { logIn } from "store";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const KakaoBtn = styled(KakaoLogin)`
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

class KakaoLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      provider: "",
      logged: false,
      error: null,
      loading: true,
    };
  }

  responseKakao = async (res) => {
    try {
      this.setState(
        {
          id: res.profile.id,
          name: res.profile.properties.nickname,
          email: res.profile.kakao_account.email,
          provider: "kakao",
        },
        async () => {
          const {
            data: { token },
          } = await usersApi.kakaoLogin(this.state.name, this.state.email);
          this.props.setLogIn({ token, logged: true });
        }
      );
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
        <KakaoBtn
          jsKey="652728f30d952eaeda20af5b98991887"
          buttonText="카카오톡 로그인"
          onSuccess={this.responseKakao}
          onFailure={this.responseFail}
          getProfile="true"
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLogIn: (data) => dispatch(logIn(data)),
  };
};

export default connect(null, mapDispatchToProps)(KakaoLogIn);
