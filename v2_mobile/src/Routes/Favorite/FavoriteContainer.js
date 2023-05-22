import React from "react";
import FavoritePresenter from "./FavoritePresenter";
import { usersApi } from "api";
import Loader from "Components/Loader";

export default class extends React.Component {
  state = {
    like: null,
    error: null,
    loading: true,
    directPurchase: false,
  };

  async componentDidMount() {
    try {
      const { data: like } = await usersApi.favs();
      this.setState({
        like,
      });
    } catch {
      this.setState({ error: "Can't find like items" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { like, error, loading, directPurchase } = this.state;

    return loading ? (
      <Loader />
    ) : (
      <FavoritePresenter
        like={like}
        error={error}
        loading={loading}
        directPurchase={directPurchase}
      />
    );
  }
}
