import React from "react";
import PurchasePresenter from "./PurchasePresenter";
import Loader from "Components/Loader";
import { usersApi } from "api";

export default class extends React.Component {
  state = {
    checkedBasket: [],
    user: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const { checkedBasket } = this.props.location.state;
    const { data: user } = await usersApi.mypage();
    try {
      this.setState({
        checkedBasket,
        user,
      });
    } catch {
      this.setState({ error: "Can't find basket items" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { checkedBasket, user, error, loading } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <PurchasePresenter
        checkedBasket={checkedBasket}
        user={user}
        error={error}
        loading={loading}
      />
    );
  }
}
