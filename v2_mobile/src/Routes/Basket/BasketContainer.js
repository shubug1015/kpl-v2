import React from "react";
import BasketPresenter from "./BasketPresenter";
import { usersApi } from "api";
import Loader from "Components/Loader";
import store from "store";

export default class extends React.Component {
  state = {
    user: null,
    basket: null,
    error: null,
    loading: true,
    directPurchase: false,
  };

  async componentDidMount() {
    var directPurchase = false;
    if (this.props.location.state) {
      ({ directPurchase } = this.props.location.state);
    }
    try {
      // if (
      //   store.getState().user?.logged &&
      //   basketsId.includes(directPurchase.id) === false
      // ) {
      //   await usersApi.addToBasket(directPurchase.id);
      // }
      const { data: user } = await usersApi.mypage();
      const { data } = await usersApi.basket(store.getState().user?.token);
      const basket = data.map((basket) => {
        basket.product.option = basket.option;
        basket.product.qty = basket.qty;
        basket.product.productId = basket.product.id;
        basket.product.id = basket.id;
        return basket.product;
      });
      this.setState({
        user,
        basket,
        directPurchase,
      });
    } catch {
      this.setState({ error: "Can't find basket items" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, basket, error, loading, directPurchase } = this.state;

    return loading ? (
      <Loader />
    ) : (
      <BasketPresenter
        user={user}
        basket={basket}
        error={error}
        loading={loading}
        directPurchase={directPurchase}
      />
    );
  }
}
