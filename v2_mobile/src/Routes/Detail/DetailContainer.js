import React from "react";
import DetailPresenter from "./DetailPresenter";
import { productsApi, usersApi } from "api";
import Loader from "Components/Loader";
import store from "store";

export default class extends React.Component {
  state = {
    detail: "",
    favs: [],
    baskets: [],
    recent: [],
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    try {
      const productId = id;

      if (store.getState()?.user.logged) {
        const {
          data: { product: detail, detail_img: productImg },
        } = await productsApi.showDetail(id);
        const { data: favsData } = await usersApi.favs();
        const {
          data: { results: reviews },
        } = await usersApi.reviews(productId);
        const {
          data: { results: qnas },
        } = await usersApi.qnas(productId);
        const { data: basketData } = await usersApi.basket();
        const favs = favsData.map((item) => item.product);
        const baskets = basketData.map((item) => item.product);
        const recent = store.getState()?.products.map((i) => i.product);

        this.setState({
          detail,
          productImg,
          favs,
          baskets,
          recent,
          reviews,
          qnas,
        });
      } else {
        const {
          data: { product: detail, detail_img: productImg },
        } = await productsApi.showDetail(id);
        const recent = store.getState()?.products.map((i) => i.product);
        this.setState({ detail, productImg, recent });
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      detail,
      productImg,
      favs,
      baskets,
      recent,
      reviews,
      qnas,
      error,
      loading,
    } = this.state;

    return loading ? (
      <Loader />
    ) : (
      <DetailPresenter
        detail={detail}
        productImg={productImg}
        favs={favs}
        baskets={baskets}
        recent={recent}
        reviews={reviews}
        qnas={qnas}
        error={error}
        loading={loading}
      />
    );
  }
}
