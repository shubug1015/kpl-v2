import React from "react";
import MyPagePresenter from "./MyPagePresenter";
import { usersApi } from "api";
import Loader from "Components/Loader";

export default class extends React.Component {
  state = {
    user: null,
    basket: null,
    like: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const { data: user } = await usersApi.mypage();
      const { data: basket } = await usersApi.basket();
      const { data: like } = await usersApi.favs();
      this.setState({
        user,
        basket,
        like,
      });
    } catch {
      this.setState({ error: "Can't find user" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, basket, like, error, loading } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <MyPagePresenter
        user={user}
        basket={basket}
        like={like}
        error={error}
        loading={loading}
      />
    );
  }
}
